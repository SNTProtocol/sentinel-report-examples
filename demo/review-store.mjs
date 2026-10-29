// Extracted from the Sentinel investigation prototype; public demo is always synthetic.
const isDemo = true;
const REVIEW_STORAGE_KEY = isDemo ? "sentinel.demo.review-actions.v1" : "sentinel.review-actions.v1";
const REVIEWER_STORAGE_KEY = isDemo ? "sentinel.demo.reviewer-name.v1" : "sentinel.reviewer-name.v1";
const DEFAULT_REVIEWER = isDemo ? "Demo reviewer" : "Demo reviewer";
const REVIEW_ACTIONS = new Set(["Closed", "Information requested", "Escalated"]);

function safeStorage(storage) {
  if (storage) return storage;
  try {
    return globalThis.localStorage;
  } catch {
    return null;
  }
}

export function loadReviewActions(storage) {
  const target = safeStorage(storage);
  if (!target) return [];
  try {
    const parsed = JSON.parse(target.getItem(REVIEW_STORAGE_KEY) || "[]");
    return Array.isArray(parsed) ? parsed.filter((item) => item && item.case_id && item.action && item.reviewer && item.timestamp && item.reason) : [];
  } catch {
    return [];
  }
}

export function recordReviewAction({ caseId, action, reviewer, reason, timestamp = new Date().toISOString() }, storage) {
  if (!caseId || !REVIEW_ACTIONS.has(action) || !String(reviewer || "").trim() || !String(reason || "").trim()) {
    throw new Error("A case, supported decision, reviewer, and reason are required.");
  }
  const target = safeStorage(storage);
  const event = {
    id: `REV-${Date.parse(timestamp)}-${Math.random().toString(36).slice(2, 8)}`,
    case_id: caseId,
    action,
    reviewer: String(reviewer).trim(),
    timestamp,
    reason: String(reason).trim(),
  };
  if (target) {
    const actions = loadReviewActions(target);
    actions.unshift(event);
    target.setItem(REVIEW_STORAGE_KEY, JSON.stringify(actions.slice(0, 500)));
  }
  return event;
}

export function getReviewerName(storage) {
  const target = safeStorage(storage);
  if (!target) return DEFAULT_REVIEWER;
  try {
    return String(target.getItem(REVIEWER_STORAGE_KEY) || DEFAULT_REVIEWER).trim() || DEFAULT_REVIEWER;
  } catch {
    return DEFAULT_REVIEWER;
  }
}

export function setReviewerName(name, storage) {
  const cleaned = String(name || "").trim();
  if (!cleaned || cleaned.length > 80) throw new Error("Reviewer name must be 1–80 characters.");
  const target = safeStorage(storage);
  if (target) target.setItem(REVIEWER_STORAGE_KEY, cleaned);
  return cleaned;
}

export function reviewStorageKey() {
  return REVIEW_STORAGE_KEY;
}
