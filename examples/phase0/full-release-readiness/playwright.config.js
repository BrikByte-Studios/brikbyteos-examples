const path = require('path');

module.exports = {
  testDir: './tests',
  timeout: 15000,
  fullyParallel: false,
  forbidOnly: true,
  retries: 0,
  workers: 1,
  reporter: [['json']],
  use: {
    browserName: 'chromium',
    headless: true,
    trace: 'off',
    screenshot: 'off',
    video: 'off',
    baseURL: `file://${path.resolve(__dirname, 'pages')}/`
  }
};