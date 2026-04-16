# Jest TypeScript Example (Phase 0)

This example demonstrates running BrikByteOS against a TypeScript project using Jest.

## Install

```bash
npm install
```

## Run tests directly
```bash
npm test
```

## Run with BrikByteOS

From repo root:
```bash
bb run --adapter jest --workdir examples/phase0/jest-ts-release-readiness
```
Or from inside:
```bash
bb run --adapter jest --workdir .
```

## Expected Result
- Adapter: jest → succeeded
- `.bb/runs/<id>/normalized/unit.json` generated

---

# 🚀 7. How to run (REAL FLOW)

## Step 1 — install

```bash
cd examples/phase0/jest-ts-release-readiness
npm install
```

## Step 2 — run bb
### From root
```bash
bb run --adapter jest --workdir examples/phase0/jest-ts-release-readiness
```

### Or local
```bash
bb run --adapter jest --workdir .
```

---

## Step 3 — Expected output
```
Run Summary
  Run ID: 20260416TXXXXXX
  Status: ok
  Resolved Adapters:
    - jest
  Adapter Results:
    - jest: succeeded
```

---

## Step 4 — Artifacts created
```
.bb/
└── runs/
    └── <run-id>/
        ├── manifest.json
        ├── raw/
        ├── normalized/
        │   └── unit.json
        └── logs/
```