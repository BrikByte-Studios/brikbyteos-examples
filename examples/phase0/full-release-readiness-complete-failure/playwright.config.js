const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./ui",
  use: {
    baseURL: "file://" + process.cwd() + "/"
  },
  reporter: "json"
});