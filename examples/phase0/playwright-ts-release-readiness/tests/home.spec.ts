import { test, expect } from '@playwright/test';

test.describe('home page smoke checks', () => {
  test('renders the main heading and tagline', async ({ page }) => {
    await page.goto('home.html');

    await expect(
      page.getByRole('heading', { name: 'Release Readiness Dashboard' })
    ).toBeVisible();

    await expect(page.locator('#tagline')).toHaveText(
      'Deterministic release evidence for safer delivery.'
    );
  });

  test('shows the review call to action', async ({ page }) => {
    await page.goto('home.html');

    await expect(page.locator('#start-review')).toHaveText('Start Review');
  });
});