import { defineConfig } from "@playwright/test";
import path from "path";

export default defineConfig({
  testDir: path.join(__dirname, "tests"),

  reporter: "json",

  fullyParallel: false,
  workers: 1,
  retries: 0,

  timeout: 30000,

  use: {
    headless: true,
    browserName: "chromium"
  }
});