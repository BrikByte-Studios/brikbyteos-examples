# In-Progress Phase 0 Manifest Example

This fixture demonstrates the canonical **in-progress** Phase 0 manifest state for BrikByteOS.

## Purpose

Use this example to show that:

- the manifest exists **before full run completion**
- the manifest remains **inspectable during execution**
- completed adapter progress is persisted incrementally
- unresolved adapters can remain in `pending` or `running`
- artifact references can accumulate during the lifecycle

## Lifecycle posture shown here

This example represents a run that has:

- been initialized successfully
- started execution
- completed the `jest` adapter successfully
- started the `k6` adapter but not finished it yet
- not yet started `playwright`
- not yet started `trivy`

Because the run is still active:

- `overall_status` is `running`
- `finished_at` is intentionally omitted

## Key things this fixture demonstrates

### 1. The manifest exists early
The manifest is already present even though the run has not completed.

### 2. Selection is explicit and inspectable
The manifest records both:

- the selection mode
- the resolved adapter set

In this example:

- `mode` is `all`
- `requested_adapters` is empty because the operator did not explicitly name adapters
- `resolved_adapters` contains the canonical Phase 0 adapter set

### 3. Adapter progress is incremental
The manifest shows mixed adapter states at one point in time:

- `jest` → `succeeded`
- `k6` → `running`
- `playwright` → `pending`
- `trivy` → `pending`

This demonstrates that the manifest is not just an end-of-run artifact.

### 4. Artifact references grow over time
Artifacts already exist for completed or active adapters.

In this example:

- run-scoped artifacts exist for:
  - `manifest.json`
  - `logs/run.log`
- adapter-scoped artifacts exist for:
  - completed `jest`
  - active `k6`

This reflects the Phase 0 expectation that artifact discovery should work during the run, not only after finalization.

## Field notes

### `schema_version`
Fixed to `0.1` for Phase 0.

### `run_id`
Uses the canonical run ID format.

### `started_at`
Present because the run has started.

### `finished_at`
Not present because the run is still in progress.

### `overall_status`
Set to `running` because the run is active and non-terminal.

### `adapter_summaries`
Provides a bounded per-adapter summary view only.
It does not embed raw tool output.

### `artifacts`
All paths are:

- relative
- inside the run artifact tree
- either run-scoped or adapter-scoped

## Why this example matters

This fixture helps validate that the manifest contract can represent:

- a real mid-run state
- partial progress without corruption
- meaningful inspection before finalization

It is especially useful for:

- schema validation
- manifest writer tests
- future `bb inspect` behavior
- lifecycle documentation