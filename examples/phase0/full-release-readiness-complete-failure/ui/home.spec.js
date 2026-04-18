const { test, expect } = require("@playwright/test");

test("renders main heading", async ({ page }) => {
  await page.goto("file://" + process.cwd() + "/index.html");
  await expect(page.locator("h1")).toHaveText("Wrong Heading");
});

test("shows release status", async ({ page }) => {
  await page.goto("file://" + process.cwd() + "/index.html");
  await expect(page.locator("#status")).toHaveText("degraded");
});