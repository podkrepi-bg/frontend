import type { PlaywrightTestConfig } from '@playwright/test'
import path from 'path'

const e2eReportsFolder = path.resolve(__dirname, 'e2e-reports')

/**
 * See https://playwright.dev/docs/test-configuration
 */

const config: PlaywrightTestConfig = {
  name: 'Podkrepi.bg E2E tests',
  testDir: './tests',
  /* Maximum time one test can run for. */
  timeout: 60 * 1000,
  expect: {
    timeout: 10 * 1000,
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  // TODO update here
  workers: process.env.CI ? 1 : undefined,
  // outputDir: path.resolve(e2eReportsFolder, 'output-tests'),
  reporter: [
    ['html', { outputFolder: path.resolve(e2eReportsFolder, 'html-report'), open: 'never' }],
  ],
  use: {
    browserName: 'chromium',
    headless: true,
    screenshot: {
      mode: 'only-on-failure',
      fullPage: true,
    },
    video: {
      mode: 'off',
      size: {
        width: 1500,
        height: 900,
      },
    },
    trace: 'retain-on-failure',
    launchOptions: {
      args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream'],
      downloadsPath: path.resolve(e2eReportsFolder, 'downloads'),
    },
    baseURL: process.env.STAGING ? 'https://dev.podkrepi.bg' : 'http://localhost:3040',
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },
  // TODO Update here later

  /* Configure projects for major browsers */
  // projects: [
  //   {
  //     name: 'chromium',
  //     use: {
  //       ...devices['Desktop Chrome'],
  //     },
  //   },

  //   {
  //     name: 'firefox',
  //     use: {
  //       ...devices['Desktop Firefox'],
  //     },
  //   },

  //   {
  //     name: 'webkit',
  //     use: {
  //       ...devices['Desktop Safari'],
  //     },
  //   },

  //   /* Test against mobile viewports. */
  //   {
  //     name: 'Mobile Chrome',
  //     use: {
  //       ...devices['Pixel 5'],
  //     },
  //   },
  //   {
  //     name: 'Mobile Safari',
  //     use: {
  //       ...devices['iPhone 12'],
  //     },
  //   },

  //   /* Test against branded browsers. */
  //   {
  //     name: 'Microsoft Edge',
  //     use: {
  //       channel: 'msedge',
  //     },
  //   },
  //   {
  //     name: 'Google Chrome',
  //     use: {
  //       channel: 'chrome',
  //     },
  //   },
  // ]
}

export default config
