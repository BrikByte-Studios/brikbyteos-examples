import { test, expect } from "@playwright/test";
import path from "path";

function fileUrl(rel: string): string {
  return `file://${path.resolve(__dirname, rel)}`;
}

test.describe("navigation (ts)", () => {
  test("docs link", async ({ page }) => {
    await page.goto(fileUrl("../pages/home.html"));

    await expect(page.locator("#docs-link")).toHaveAttribute("href", "#docs");
  });

  test("about link", async ({ page }) => {
    await page.goto(fileUrl("../pages/home.html"));

    await expect(page.locator("#about-link")).toHaveAttribute("href", "#about");
  });
});