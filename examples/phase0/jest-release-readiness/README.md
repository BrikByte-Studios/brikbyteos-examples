# Phase 0 Example — Jest Release Readiness

This example demonstrates a realistic `bb run --adapter jest` flow for BrikByteOS Phase 0.

## Purpose

This fixture simulates a small service that exposes:

- health state logic
- release readiness decision logic

The repository uses Jest to validate those rules. BrikByteOS can then execute the
Jest adapter to produce canonical Phase 0 unit evidence.

## What this proves

- a real repository can be tested with Jest
- the Jest adapter can run deterministically
- BrikByteOS can persist raw and normalized test evidence
- the resulting artifacts can participate in scoring, gating, and inspection

## Install

```bash
npm install
```

## Run Jest directly
```bash
npm test
```

## Run via BrikByteOS
```bash
bb run --adapter jest
```

## Expected output shape

After execution, BrikByteOS should create:
```
.bb/runs/<run-id>/
  manifest.json
  raw/
  normalized/unit.json
  logs/
```

## Notes

This example is intentionally deterministic:
- no network calls
- no clock-dependent assertions
- no randomness
- no flaky concurrency assumptions