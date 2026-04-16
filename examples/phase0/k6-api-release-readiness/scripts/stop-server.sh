#!/usr/bin/env bash
set -euo pipefail

PORT="${PORT:-3010}"

PID="$(lsof -ti tcp:${PORT} || true)"
if [[ -n "${PID}" ]]; then
  kill "${PID}"
fi