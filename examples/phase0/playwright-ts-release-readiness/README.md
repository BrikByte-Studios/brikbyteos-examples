# Phase 0 Example — Playwright TypeScript Release Readiness

This example demonstrates a realistic `bb run --adapter playwright` flow for BrikByteOS Phase 0 using TypeScript.

## Purpose

This fixture simulates a small static product page with:

- a visible product heading
- a release CTA
- primary navigation
- bounded smoke checks

The repository uses Playwright with TypeScript to validate user-visible release readiness. BrikByteOS then executes the Playwright adapter to produce canonical Phase 0 UI evidence.

## What this proves

- a real repository can be tested with Playwright + TypeScript
- the Playwright adapter can run deterministically
- BrikByteOS can persist raw and normalized UI evidence
- the resulting artifacts can participate in scoring, gating, and inspection

## Install

```bash
npm install
npx playwright install chromium
```

## Run Playwright directly
```bash
npm test
```

## Run via BrikByteOS

From repo root:
```bash
bb run --adapter playwright --workdir examples/phase0/playwright-ts-release-readiness
```
From inside the example:
```bash
bb run --adapter playwright --workdir .
```

## Expected output shape

After execution, BrikByteOS should create:
```
.bb/runs/<run-id>/
  manifest.json
  raw/
  normalized/ui.json
  logs/
```

## Notes

This example is intentionally deterministic:
- no network calls
- no backend dependencies
- no time-based assertions
- no random data
- one browser only
- one local static page