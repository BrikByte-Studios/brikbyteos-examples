const { defineConfig } = require("@playwright/test");
const path = require("path");

module.exports = defineConfig({
  testDir: path.join(__dirname, "tests"),
  reporter: "json",
  fullyParallel: false,
  workers: 1,
  retries: 0,
  timeout: 30000,
  use: {
    headless: true
  }
});