const { test, expect } = require('@playwright/test');

test.describe('home page smoke checks', () => {
  test('renders the main heading and tagline', async ({ page }) => {
    await page.goto('home.html');

    await expect(
      page.getByRole('heading', { name: 'Release Readiness Dashboard' })
    ).toBeVisible();

    await expect(page.locator('#tagline')).toHaveText(
      'Deterministic evidence for safer software releases.'
    );
  });

  test('shows the release review call to action', async ({ page }) => {
    await page.goto('home.html');

    await expect(page.locator('#start-release')).toHaveText(
      'Start Release Review'
    );
  });
});