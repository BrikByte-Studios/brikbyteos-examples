const { test, expect } = require('@playwright/test');

test('renders main heading', async ({ page }) => {
  await page.goto('home.html');

  await expect(
    page.getByRole('heading', { name: 'Release Readiness Dashboard' })
  ).toBeVisible();

  await expect(page.locator('#tagline')).toHaveText(
    'Deterministic evidence across all release domains.'
  );
});

test('shows release status', async ({ page }) => {
  await page.goto('home.html');

  await expect(
    page.getByRole('heading', { name: 'Release Decision' })
  ).toBeVisible();

  await expect(page.locator('#release-status')).toHaveText(
    'Status: Ready for review'
  );
});