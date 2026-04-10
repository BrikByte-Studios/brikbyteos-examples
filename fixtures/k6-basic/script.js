import { check, sleep } from "k6";

export const options = {
  vus: 1,
  iterations: 1,
  thresholds: {
    iteration_duration: ["avg<2000"],
    checks: ["rate==1"]
  }
};

export default function () {
  check({ ok: true }, {
    "basic check passes": (v) => v.ok === true
  });

  sleep(0.1);
}