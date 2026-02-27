import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Recreate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file
dotenv.config({
  path: path.resolve(__dirname, '.env'),
  quiet: true,
});

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  // Reporters
  reporter: [
    ['list'],
    ['html', { open: 'on-failure' }],
    ['./ai/aiReporter.ts'],
    [
      'allure-playwright',
      {
        outputFolder: 'allure-results',
        detail: true,
        suiteTitle: false,
      },
    ],
  ],

  // Shared settings
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  // Browser projects
  projects: [
    {
      name: 'google chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'safari',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  /*
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
  */
});
