import { test, expect } from "@playwright/test";
import path from "path";

function fileUrl(rel: string): string {
  return `file://${path.resolve(__dirname, rel)}`;
}

test.describe("home page (ts)", () => {
  test("renders title", async ({ page }) => {
    await page.goto(fileUrl("../pages/home.html"));

    await expect(page.locator("#title")).toHaveText(
      "Hello BrikByteOS TS"
    );
  });

  test("renders description", async ({ page }) => {
    await page.goto(fileUrl("../pages/home.html"));

    await expect(page.locator("#content")).toContainText(
      "Deterministic TypeScript UI fixture."
    );
  });
});