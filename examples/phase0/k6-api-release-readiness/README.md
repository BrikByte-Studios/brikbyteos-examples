# Phase 0 Example — k6 API Release Readiness

This example demonstrates a realistic `bb run --adapter k6` flow for BrikByteOS Phase 0.

## Purpose

This fixture simulates a small local HTTP service that exposes:

- `/health`
- `/ready`
- `/release`

The repository uses k6 to validate performance and response correctness for a
bounded release-readiness smoke profile. BrikByteOS then executes the k6
adapter to produce canonical Phase 0 performance evidence.

## What this proves

- a real repository can be tested with k6
- the k6 adapter can run deterministically
- BrikByteOS can persist raw and normalized performance evidence
- the resulting artifacts can participate in scoring, gating, and inspection

## Install

```bash
npm install
```
You also need `k6` installed locally and accessible on PATH, unless your
BrikByteOS adapter is configured with an explicit k6 executable.

## Start the local service
```bash
npm run start
```
## Run k6 directly
```bash
npm run perf
```
## Run via BrikByteOS
```bash
bb run --adapter k6
```

## Expected output shape

After execution, BrikByteOS should create:
```
.bb/runs/<run-id>/
  manifest.json
  raw/
  normalized/perf.json
  logs/
```

## How to run it

From inside the example directory:
```bash
cd brikbyteos-examples/examples/phase0/k6-api-release-readiness
npm install
npm run start
```
In another terminal:
```bash
cd brikbyteos-examples/examples/phase0/k6-api-release-readiness
bb run --adapter k6
```
Or run k6 directly:
```bash
npm run perf
```
## Notes

This example is intentionally deterministic:
- local service only
- no external network dependency
- bounded request volume
- stable thresholds
- no random data