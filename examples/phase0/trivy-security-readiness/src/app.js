const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'trivy-security-readiness'
  });
});

app.get('/release', (_req, res) => {
  res.status(200).json({
    decision: 'reviewable',
    message: 'security evidence can now be evaluated'
  });
});

app.listen(port, () => {
  console.log(`trivy-security-readiness listening on http://127.0.0.1:${port}`);
});