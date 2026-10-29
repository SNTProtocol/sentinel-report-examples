# Sentinel Report Examples

**Sentinel / Sentinel Protocol / SNT Protocol** is building a clearer evidence and human-review workflow for digital asset transactions.

This small developer showcase demonstrates one idea: a report should distinguish **what was observed**, **what was declared**, and **what remains unknown**. It includes runnable code, synthetic report data and offline tests.

## Run the example

Requires Node.js 20 or later. No installation, API key or wallet connection is needed.

```sh
npm run demo
npm test
```

The demo prints a summary with two observations returned, two missing observations, human review required and no underwriting decision. It makes no network requests and never sends a transaction.

## What the code demonstrates

- Missing information remains unknown rather than becoming a positive signal.
- Observations with contradictory states are rejected.
- Returned observations never imply a safe counterparty or insurance approval.
- A report summary can be consumed by a human-review workflow.

`examples/synthetic-report.json` is an illustrative format, not a stable API contract. Every observation is invented for demonstration. The summary checks example structure only; it does not verify onchain data, source provenance, balances or commercial promises.

## Product direction

Our near-term research focuses on Ethereum/EVM payment-intent evidence for potential crypto-insurance partners. An insurer would define required evidence and make its own underwriting and coverage decisions. Future token or service delivery cannot be guaranteed from these observations.

The wider product remains experimental. No insurer integration, audited security, adoption or revenue is claimed. This repository is not the full backend, a live risk engine or production-ready infrastructure.

## Repository contents

- `src/summarize-report.mjs`: runnable offline summary logic.
- `examples/`: a synthetic report and demo runner.
- `tests/`: deterministic validation and evidence-semantics tests.

Production services, private core implementation, credentials and customer information are not included.

## Contact

Founder: Sonny Young  
X: [@SNTProtocol](https://x.com/SNTProtocol)

For technical diligence or a scoped pilot discussion, contact the founder through the official project account.

## License

Copyright (c) 2026 SNT Protocol. All rights reserved. Source is published for inspection; no open-source license has been granted. Contact the owner for reuse permission.
