import http from "k6/http";
import { check } from "k6";

export const options = {
  vus: 1,
  iterations: 3,
  thresholds: {
    http_req_duration: ["p(95)<1"],
    http_req_failed: ["rate<0.000001"]
  }
};

export default function () {
  const res = http.get("https://test.k6.io");
  check(res, {
    "status is 200": (r) => r.status === 200
  });
}