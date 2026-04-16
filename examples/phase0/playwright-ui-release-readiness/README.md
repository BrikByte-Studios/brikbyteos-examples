# Phase 0 Example — Playwright UI Release Readiness

This example demonstrates a realistic `bb run --adapter playwright` flow for BrikByteOS Phase 0.

## Purpose

This fixture simulates a small static product page with:

- a visible product heading
- navigation links
- a release CTA
- bounded smoke checks

The repository uses Playwright to validate user-visible release readiness. BrikByteOS then executes the Playwright adapter to produce canonical Phase 0 UI evidence.

## What this proves

- a real repository can be tested with Playwright
- the Playwright adapter can run deterministically
- BrikByteOS can persist raw and normalized UI evidence
- the resulting artifacts can participate in scoring, gating, and inspection

## Install

```bash
npm install
npx playwright install --with-deps chromium
```

## Run Playwright directly
```
npm test
```

## Run via BrikByteOS
```bash
bb run --adapter playwright
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
- no live backend
- no current-time assertions
- no random data
- one browser only
- one local HTML page