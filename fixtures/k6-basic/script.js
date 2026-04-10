import { check, sleep } from "k6";

export const options = {
  vus: 1,
  iterations: 1,
  thresholds: {
    iteration_duration: ["<2000"],
    checks: [">=1"]
  }
};

export default function () {
  const ok = true;
  check({ ok }, {
    "basic check passes": (v) => v.ok === true
  });

  sleep(0.1);
}