import { sleep } from "k6";

export const options = {
  vus: 1,
  iterations: 1,
  thresholds: {
    iteration_duration: ["<2000"]
  }
};

export default function () {
  sleep(0.1);
}