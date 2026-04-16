# BrikByteOS CLI

[![CI](https://github.com/BrikByte-Studios/brikbyteos-cli/actions/workflows/ci.yml/badge.svg)](https://github.com/BrikByte-Studios/brikbyteos-cli/actions/workflows/ci.yml)
[![Phase 0 Integration](https://github.com/BrikByte-Studios/brikbyteos-cli/actions/workflows/brikbyteos-cli-phase0-integration.yml/badge.svg)](https://github.com/BrikByte-Studios/brikbyteos-cli/actions/workflows/brikbyteos-cli-phase0-integration.yml)
[![Phase 0 Determinism](https://github.com/BrikByte-Studios/brikbyteos-cli/actions/workflows/brikbyteos-cli-phase0-determinism.yml/badge.svg)](https://github.com/BrikByte-Studios/brikbyteos-cli/actions/workflows/brikbyteos-cli-phase0-determinism.yml)
[![Phase 0 Policy](https://github.com/BrikByte-Studios/brikbyteos-cli/actions/workflows/brikbyteos-cli-phase0-policy.yml/badge.svg)](https://github.com/BrikByte-Studios/brikbyteos-cli/actions/workflows/brikbyteos-cli-phase0-policy.yml)
[![Phase 0 Schema Contracts](https://github.com/BrikByte-Studios/brikbyteos-cli/actions/workflows/brikbyteos-cli-phase0-schema-contracts.yml/badge.svg)](https://github.com/BrikByte-Studios/brikbyteos-cli/actions/workflows/brikbyteos-cli-phase0-schema-contracts.yml)
[![Go Version](https://img.shields.io/github/go-mod/go-version/BrikByte-Studios/brikbyteos-cli)](https://github.com/BrikByte-Studios/brikbyteos-cli/blob/main/go.mod)
[![License](https://img.shields.io/github/license/BrikByte-Studios/brikbyteos-cli)](./LICENSE)

BrikByteOS CLI is the Go-based command-line entrypoint for **BrikByteOS Phase 0**.

Phase 0 establishes the deterministic control-layer foundation for release certification:
- execute approved adapters
- persist raw and normalized evidence
- compute deterministic score output
- evaluate production policy
- resolve a release verdict
- leave a truthful local artifact trail

This repository is the canonical home of the `bb` CLI and the bounded developer workflows that support it.

---

## What this repository owns

`brikbyteos-cli` owns:

- the `bb` command-line binary
- command construction and shared CLI behavior
- static adapter registry for approved Phase 0 adapters
- deterministic execution orchestration
- raw and normalized artifact persistence
- score / policy / verdict command wiring
- Phase 0 developer workflows
- root onboarding documentation for this repository

This repository does **not** own:
- broader product marketing material
- enterprise deployment documentation
- cross-repo onboarding for all BrikByte repositories
- Phase 1+ platform capabilities that are not yet implemented here

---

## What Phase 0 is

Phase 0 proves the minimum viable control layer for deterministic release certification.

### Included in Phase 0

- Go CLI entrypoint: `bb`
- canonical commands:
  - `bb version`
  - `bb run`
  - `bb inspect`
  - `bb score`
  - `bb gate`
- static registry of approved adapters
- deterministic local artifact layout under `.bb/`
- bounded normalized evidence
- deterministic score model
- one production policy pack
- bounded verdict resolution
- deeper architecture and subsystem docs under `docs/phase0/**`

### Not included in Phase 0

- production deployment operations
- enterprise control plane
- dynamic plugin loading
- broad UI product experience
- Phase 1+ roadmap behavior
- automatic installation of external toolchains

This README is intentionally developer-first and bounded to what a contributor needs to get started safely.

---

## Install

For installing a released version of the CLI (v0.1.0 and above), see:

👉 [Phase 0 Install Guide](https://github.com/BrikByte-Studios/brikbyteos-cli/blob/main/docs/release/phase0-install.md)

This guide provides platform-specific installation steps for Linux, macOS, and Windows.

Note:
- The install guide is for released binaries
- The "Local setup" section below is for contributors building from source

---

## Primary audience

This README is written for:
- new engineers
- contributors
- reviewers
- maintainers onboarding into `brikbyteos-cli`

It is the first-touch entry point for:
- understanding repo scope
- bootstrapping locally
- running the approved onboarding flow
- understanding where artifacts go
- finding deeper technical docs

---

## Prerequisites

### Required

- Go `1.24+`
- `make`

### Required for full policy flow

- `opa`

### Optional, depending on local workflows

These tools are needed only for workflows that execute their real adapters locally:

- `jest`
- `playwright`
- `k6`
- `trivy`

Important:
- not every onboarding step requires the full external adapter toolchain
- optional tools must not be mistaken as universally required
- if a workflow depends on an optional tool, that dependency must be stated explicitly

---

## Repository structure

```text
cmd/bb                  CLI entrypoint
internal/cli            command construction and shared CLI behavior
internal/adapters       approved adapter implementations and registry
internal/artifacts      .bb/ path and artifact helpers
internal/execution      deterministic execution handling
internal/normalization  raw-to-normalized transformation
internal/scoring        deterministic score model
internal/policy         policy evaluation support
internal/gate           verdict resolution
internal/manifest       persisted run manifest support
internal/schema         schema validation support
schemas/                canonical schema assets
policies/               production policy pack
docs/                   deeper engineering documentation
bin/                    local built binary output
```

---

## Local setup
### Bootstrap dependencies
```bash
make bootstrap
```
If your repo also aliases dependency setup:
```bash
make deps
```

### Build the binary
```bash
make build-binary
```
Expected output:
```
bin/bb
```

### Verify the build
```bash
make verify-build
```

### Smoke-test the CLI shell
```bash
./bin/bb version
./bin/bb --help
```

---

## Canonical onboarding flow

This is the approved first-touch workflow for a new engineer.

### Step 1 — bootstrap
```bash
make bootstrap
```

### Step 2 — build
```
make build-binary
```

### Step 3 — verify the CLI shell
```
./bin/bb version
./bin/bb --help
```

### Step 4 — run the approved Phase 0 integration flow
```bash
make test-phase0-integration
```
This is the preferred onboarding path because it is:
- bounded
- repeatable
- aligned to the approved Phase 0 contract
- safer than assuming a full real external adapter environment

### Step 5 — inspect deeper verification flows if needed

Determinism suite:
```bash
make test-phase0-determinism
```
Policy suite:
```bash
make test-phase0-policy
```
Schema contract suite:
```bash
make test-phase0-schema-contracts
```

---

## Main commands
### `bb version`

Print build metadata.
```bash
bb version
bb version --json
```

### `bb run`

Resolve and execute a deterministic Phase 0 run.

Examples:
```bash
bb run --all --workdir .
bb run --adapter jest --workdir .
bb run --adapter playwright --workdir .
```
Note:
- `--all` may depend on optional external tools being installed
- for first-touch onboarding, prefer the approved integration flow before relying on a full real adapter environment

### `bb inspect`

Inspect a persisted run.
```bash
bb inspect --run-id <run-id> --workdir .
```

### `bb score`

Compute deterministic score output from a completed run.
```bash
bb score --manifest .bb/runs/<run-id>/manifest.json --workdir .
```

### `bb gate`

Evaluate a manifest target against the production policy and resolve the verdict.
```bash
bb gate --manifest .bb/runs/<run-id>/manifest.json --policy production --workdir .
```

---

## Real local adapter flow

When the required external tools are installed and available, you can execute real local adapter-backed flows.

Example:
```bash
bb run --adapter jest --workdir .
```
Or:
```bash
bb run --all --workdir .
```
Important:
- real adapter-backed runs depend on local tool availability
- missing tools should fail explicitly rather than silently
- onboarding should not assume all optional tools are already installed

---

## Canonical artifact layout

BrikByteOS Phase 0 persists run artifacts under:
```
.bb/
```
The canonical layout is:
```
.bb/
  runs/
    <run-id>/
      manifest.json
      raw/
      normalized/
      logs/
```

### Meaning of each path
`manifest.json`

The bounded run-level summary and artifact reference entrypoint.

`raw/`

Contains raw execution evidence such as:
- stdout
- stderr
- raw adapter/tool payloads
- related execution artifacts

`normalized/`

Contains normalized domain-owned evidence such as:
- `unit.json`
- `ui.json`
- `perf.json`
- `security.json`

`logs/`

Contains bounded run log artifacts for local inspection.


---

## Example artifact navigation

After a successful run:
```bash
ls .bb/runs/<run-id>
```
Inspect the manifest:
```bash
cat .bb/runs/<run-id>/manifest.json
```
Inspect normalized evidence:
```bash
ls .bb/runs/<run-id>/normalized
```
Then use:
```bash
bb inspect --run-id <run-id> --workdir .
bb score --manifest .bb/runs/<run-id>/manifest.json --workdir .
bb gate --manifest .bb/runs/<run-id>/manifest.json --policy production --workdir .
```

---

## Approved Phase 0 adapters
| Adapter | Domain | Phase 0 status |
| ----- | ----- | ----- |
| Jest | unit | ✅ |
| Playwright | ui | ✅ |
| k6 | performance | ✅ |
| Trivy | security | ✅ |

Phase 0 uses:
- a static registry
- explicit adapter selection
- bounded deterministic behavior

It does not use dynamic plugin discovery.

---

## Determinism and contributor expectations

Phase 0 is intentionally strict.

### Key expectations
- use approved Makefile and CLI flows
- keep commands copy-pasteable
- avoid undocumented shell shortcuts as official guidance
- do not document speculative or future behavior as if it exists now
- distinguish required tools from optional tool-dependent workflows
- keep examples bounded and verified

This README is part of the developer contract and must stay aligned to actual repo behavior.

---

## Deeper docs

Use the root README for orientation. Use deeper docs for subsystem detail.

### Architecture
- [Overview](https://github.com/BrikByte-Studios/brikbyteos-cli/blob/main/docs/phase0/architecture/overview.md)
- [Component Boundaries](https://github.com/BrikByte-Studios/brikbyteos-cli/blob/main/docs/phase0/architecture/component-boundaries.md)

### CLI
- [Root Command](https://github.com/BrikByte-Studios/brikbyteos-cli/blob/main/docs/phase0/cli/root-command.md)
- [Run Orchestration](https://github.com/BrikByte-Studios/brikbyteos-cli/blob/main/docs/phase0/cli/run-orchestration.md)
- [Inspect Command](https://github.com/BrikByte-Studios/brikbyteos-cli/blob/main/docs/phase0/cli/inspect-command.md)

### Artifacts
- [Artifact Layout](https://github.com/BrikByte-Studios/brikbyteos-cli/blob/main/docs/phase0/artifacts/layout.md)
- [Path Builder](https://github.com/BrikByte-Studios/brikbyteos-cli/blob/main/docs/phase0/artifacts/path-builder.md)
- [Run Directory Creation](https://github.com/BrikByte-Studios/brikbyteos-cli/blob/main/docs/phase0/artifacts/run-directory-creation.md)

### Normalization
- [Normalization Contract](https://github.com/BrikByte-Studios/brikbyteos-cli/blob/main/docs/phase0/normalization/contract.md)
- [Normalization Orchestrator](https://github.com/BrikByte-Studios/brikbyteos-cli/blob/main/docs/phase0/normalization/orchestrator.md)

### Scoring
- [Score Model v0](https://github.com/BrikByte-Studios/brikbyteos-cli/blob/main/docs/phase0/scoring/score-model-v0.md)

### Policy
- [Production Policy Rules v0](https://github.com/BrikByte-Studios/brikbyteos-cli/blob/main/docs/phase0/policy/production-policy-rules-v0.md)
- [Production Policy Tests](https://github.com/BrikByte-Studios/brikbyteos-cli/blob/main/docs/phase0/policy/production-policy-tests.md)

### Gate / Verdict
- [Verdict Model v0](https://github.com/BrikByte-Studios/brikbyteos-cli/blob/main/docs/phase0/gate/verdict-model-v0.md)

### ADRs
- [ADR Index](https://github.com/BrikByte-Studios/brikbyteos-cli/blob/main/docs/adr/index.md)

If any path differs in the repo, update the link to the real existing file before merge.