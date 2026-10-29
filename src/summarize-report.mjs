/** Offline presentation example. Never infers safety or insurance eligibility. */
export function summarizeReport(report) {
  if (!report || report.schema_version !== 'example-0.1' || report.synthetic !== true)
    throw new Error('Only synthetic example-0.1 reports are supported.');
  if (!Array.isArray(report.observations) || !report.observations.length)
    throw new Error('A nonempty observations array is required.');
  const seen = new Set();
  for (const observation of report.observations) {
    if (!observation || typeof observation.name !== 'string' || !observation.name.trim() || seen.has(observation.name))
      throw new Error('Observation names must be nonempty and unique.');
    seen.add(observation.name);
    if (!['observed', 'unknown'].includes(observation.status))
      throw new Error('Unsupported observation status.');
    if (observation.status === 'observed' && (observation.value === null || observation.value === undefined))
      throw new Error('Observed data requires a value.');
    if (observation.status === 'unknown' && observation.value !== null)
      throw new Error('Unknown data must use a null value.');
  }
  const observed = report.observations.filter(item => item.status === 'observed');
  const unknown = report.observations.filter(item => item.status === 'unknown');
  return {
    synthetic: true,
    observations_returned: observed.length,
    observations_missing: unknown.length,
    evidence_status: unknown.length ? 'partial' : 'configured_observations_returned',
    review_required: true,
    underwriting_decision: 'not_provided',
    note: 'Returned observations do not establish identity, safety, future delivery or insurance coverage.'
  };
}
