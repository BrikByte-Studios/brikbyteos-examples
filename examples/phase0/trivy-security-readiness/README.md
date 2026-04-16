# Phase 0 Example — Trivy Security Readiness

This example demonstrates a realistic `bb run --adapter trivy` flow for BrikByteOS Phase 0.

## Purpose

This fixture simulates a small local application repository that is scanned with Trivy as part of bounded release-readiness validation.

The example is intentionally simple, deterministic, and offline-friendly once dependencies are installed.

## What this proves

- a real repository can be scanned with Trivy
- the Trivy adapter can run deterministically
- BrikByteOS can persist raw and normalized security evidence
- resulting evidence can participate in scoring, gating, and inspection

## Install

```bash
npm install
```
You also need `trivy` installed locally and available on `PATH`, unless your BrikByteOS adapter is configured with an explicit executable path.

## Run Trivy directly
```bash
trivy fs --format json --quiet .
```

## Run via BrikByteOS

From repo root:
```bash
bb run --adapter trivy --workdir examples/phase0/trivy-security-readiness
```
From inside the example:
```bash
bb run --adapter trivy --workdir .
```

## Expected output shape

After execution, BrikByteOS should create:
```
.bb/runs/<run-id>/
  manifest.json
  raw/
  normalized/security.json
  logs/
```

## How to run it

From repo root:
```bash
bb run --adapter trivy --workdir examples/phase0/trivy-security-readiness
```
From inside the example directory:
```bash
cd examples/phase0/trivy-security-readiness
bb run --adapter trivy --workdir .
```
Direct Trivy run:
```bash
cd examples/phase0/trivy-security-readiness
trivy fs --format json --quiet .
```
## Notes

This example is intentionally bounded:
- local filesystem scan only
- no container image scanning
- no registry access
- no network-dependent target resolution
- no dynamic runtime generation