# Phase 0 Example — Full Release Readiness

This example demonstrates a realistic end-to-end BrikByteOS Phase 0 workflow:

- `bb run --all`
- `bb score`
- `bb gate`
- `bb inspect`

## Purpose

This fixture simulates a small application repository with:

- unit tests via Jest
- UI smoke tests via Playwright
- local performance checks via k6
- filesystem security scanning via Trivy

The goal is to demonstrate deterministic release evidence collection and decision support from a single repository root.

## What this proves

- all approved Phase 0 adapters can run in one workspace
- BrikByteOS can persist raw and normalized artifacts across all domains
- the score command can compute a deterministic score from the manifest
- the gate command can resolve a deterministic release verdict
- the inspect command can render the final run

## Install

```bash
npm install
npx playwright install chromium
```
Also install these tools locally:
- `k6`
- `trivy`

## Start the local demo API
```bash
node src/app.js
```

## Run end-to-end manually

From repo root:
```bash
bb run --all --workdir examples/phase0/full-release-readiness
bb score --manifest examples/phase0/full-release-readiness/.bb/runs/<run-id>/manifest.json
bb gate --manifest examples/phase0/full-release-readiness/.bb/runs/<run-id>/manifest.json --policy production
bb inspect --run-id <run-id> --workdir examples/phase0/full-release-readiness
```
## Expected artifacts
```
.bb/runs/<run-id>/
  manifest.json
  raw/
  normalized/
    unit.json
    ui.json
    perf.json
    security.json
  logs/
```

## Real end-to-end execution flow

From repo root:

### 1. Install dependencies
```bash
cd brikbyteos-examples/examples/phase0/full-release-readiness
npm install
npx playwright install chromium
```

### 2. Start local service
```bash
node src/app.js
```

### 3. Run all adapters
```bash
cd /path/to/brikbyteos-examples
bb run --all --workdir examples/phase0/full-release-readiness
```
Expected result:
```
Run Summary
  Run ID: 20260416T220000Z-abcdef123456
  Status: ok
  Manifest: examples/phase0/full-release-readiness/.bb/runs/<run-id>/manifest.json
  Resolved Adapters:
    - jest
    - playwright
    - k6
    - trivy
```

### 4. Score the run
```bash
bb score --manifest examples/phase0/full-release-readiness/.bb/runs/<run-id>/manifest.json
```
Expected result:
- score output JSON or human summary
- deterministic score from the collected evidence

### 5. Gate the run
```bash
bb gate --manifest examples/phase0/full-release-readiness/.bb/runs/<run-id>/manifest.json --policy production
```
Expected result:
- `APPROVED` if all evidence passes Phase 0 thresholds
- otherwise deterministic rejection

### 6. Inspect the run
```bash
bb inspect --run-id <run-id> --workdir examples/phase0/full-release-readiness
```
Expected result:
- unified run view
- raw + normalized artifacts discoverable
- final run truth visible

## What artifacts should exist
```
examples/phase0/full-release-readiness/.bb/runs/<run-id>/
  manifest.json
  raw/
    jest.raw.json
    jest.stdout.log
    jest.stderr.log
    playwright.raw.json
    playwright.stdout.log
    playwright.stderr.log
    k6.raw.json
    k6.stdout.log
    k6.stderr.log
    trivy.raw.json
    trivy.stdout.log
    trivy.stderr.log
  normalized/
    unit.json
    ui.json
    perf.json
    security.json
  logs/
    run.log
```