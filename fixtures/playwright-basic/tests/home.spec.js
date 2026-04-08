const { test, expect } = require("@playwright/test");
const path = require("path");

test.describe("home page", () => {
  test("renders the page title", async ({ page }) => {
    const filePath = path.resolve(__dirname, "../pages/home.html");
    await page.goto(`file://${filePath}`);

    await expect(page.locator("#title")).toHaveText("Hello BrikByteOS");
  });

  test("renders the fixture description", async ({ page }) => {
    const filePath = path.resolve(__dirname, "../pages/home.html");
    await page.goto(`file://${filePath}`);

    await expect(page.locator("#content")).toContainText(
      "Deterministic UI fixture for Phase 0."
    );
  });
});