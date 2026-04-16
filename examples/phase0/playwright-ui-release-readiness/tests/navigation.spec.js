const { test, expect } = require('@playwright/test');

test.describe('navigation flow', () => {
  test('can navigate to the features section', async ({ page }) => {
    await page.goto('home.html');

    await page.locator('#nav-features').click();

    await expect(
      page.getByRole('heading', { name: 'Included Signals' })
    ).toBeVisible();
  });

  test('can navigate to the release section', async ({ page }) => {
    await page.goto('home.html');

    await page.locator('#nav-release').click();

    await expect(
      page.getByRole('heading', { name: 'Release Decision' })
    ).toBeVisible();

    await expect(page.locator('#release-state')).toHaveText(
      'Status: Ready for review'
    );
  });
});