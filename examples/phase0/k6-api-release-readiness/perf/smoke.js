import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1,
  iterations: 5,
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<250'],
  },
};

const baseURL = __ENV.BASE_URL || 'http://127.0.0.1:3010';

function assertJSONResponse(response, expectedStatus) {
  return check(response, {
    [`status is ${expectedStatus}`]: (r) => r.status === expectedStatus,
    'content-type is json': (r) =>
      String(r.headers['Content-Type'] || '').includes('application/json'),
  });
}

export default function () {
  const health = http.get(`${baseURL}/health`);
  assertJSONResponse(health, 200);

  const ready = http.get(`${baseURL}/ready`);
  assertJSONResponse(ready, 200);

  const release = http.get(`${baseURL}/release`);
  assertJSONResponse(release, 200);

  sleep(0.1);
}