import { test, expect } from '@playwright/test';

test.describe('navigation flow', () => {
  test('can navigate to the evidence signals section', async ({ page }) => {
    await page.goto('home.html');

    await page.locator('#nav-signals').click();

    await expect(
      page.getByRole('heading', { name: 'Evidence Signals' })
    ).toBeVisible();
  });

  test('can navigate to the release section', async ({ page }) => {
    await page.goto('home.html');

    await page.locator('#nav-release').click();

    await expect(
      page.getByRole('heading', { name: 'Release Decision' })
    ).toBeVisible();

    await expect(page.locator('#release-status')).toHaveText(
      'Status: Ready for review'
    );
  });
});