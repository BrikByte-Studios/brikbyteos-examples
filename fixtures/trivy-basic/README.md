# Trivy Basic Fixture

This fixture provides a **minimal, deterministic security scan target** for the
BrikByteOS Phase 0 Trivy adapter.

## Purpose

- Validate Trivy adapter execution (`bb run --adapter trivy`)
- Ensure normalized output conforms to `security.schema.json`
- Provide deterministic vulnerability results across runs

## What this fixture contains

- A simple Node.js project
- A deliberately vulnerable dependency (`lodash`)
- A `.trivyignore` file to stabilize output

## How it works

1. Install dependencies
2. Run Trivy scan via BrikByteOS CLI
3. Normalize vulnerabilities into canonical schema

## Expected behavior

```bash
bb run --adapter trivy --workdir . --json
```
Should produce:
- `raw_status: succeeded`
- `normalized_present: true`
- `normalization_failed: false`

## Determinism
- Vulnerabilities are stable across runs
- Output ordering is deterministic
- Ignored CVEs reduce noise and drift

## Notes
- Requires `trivy` installed and available on PATH
- Uses filesystem scan mode only (`trivy fs`)