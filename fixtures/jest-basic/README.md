# jest-basic

Minimal deterministic Jest fixture for BrikByteOS Phase 0.

## Install

```bash
npm install
```

## Run directly with Jest
```bash
npm test
```

## Run with BrikByteOS CLI

From this directory:
```bash
/path/to/brikbyteos-cli/bin/bb run --adapter jest --workdir . --json
```
Expected outcome:
- `raw_status: "succeeded"`
- `normalized_present: true`
- `normalization_failed: false`