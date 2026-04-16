import { defineConfig } from '@playwright/test';
import path from 'path';

/**
 * Phase 0 Playwright TypeScript example configuration.
 *
 * This config is intentionally minimal and deterministic:
 * - one browser
 * - no retries
 * - no trace/video/screenshot noise
 * - static local file target
 */
export default defineConfig({
  testDir: './tests',
  timeout: 15_000,
  fullyParallel: false,
  forbidOnly: true,
  retries: 0,
  workers: 1,
  reporter: [['json']],
  use: {
    browserName: 'chromium',
    headless: true,
    trace: 'off',
    screenshot: 'off',
    video: 'off',
    baseURL: `file://${path.resolve(__dirname, 'pages')}/`,
  },
});