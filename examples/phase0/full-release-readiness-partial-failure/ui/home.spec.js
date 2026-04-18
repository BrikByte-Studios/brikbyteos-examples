const { test, expect } = require("@playwright/test");

test("renders main heading", async ({ page }) => {
  await page.goto("file://" + process.cwd() + "/index.html");
  await expect(page.locator("h1")).toHaveText("Release Dashboard");
});

test("shows release status", async ({ page }) => {
  await page.goto("file://" + process.cwd() + "/index.html");
  // intentional failure for partial-failure simulation
  await expect(page.locator("#status")).toHaveText("degraded");
});