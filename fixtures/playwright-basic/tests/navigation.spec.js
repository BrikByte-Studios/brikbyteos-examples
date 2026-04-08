const { test, expect } = require("@playwright/test");
const path = require("path");

test.describe("navigation", () => {
  test("docs link points to docs fragment", async ({ page }) => {
    const filePath = path.resolve(__dirname, "../pages/home.html");
    await page.goto(`file://${filePath}`);

    await expect(page.locator("#docs-link")).toHaveAttribute("href", "#docs");
  });

  test("about link points to about fragment", async ({ page }) => {
    const filePath = path.resolve(__dirname, "../pages/home.html");
    await page.goto(`file://${filePath}`);

    await expect(page.locator("#about-link")).toHaveAttribute("href", "#about");
  });
});