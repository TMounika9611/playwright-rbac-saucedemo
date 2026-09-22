import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  //forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 1,
  /* Opt out of parallel tests on CI. */
  workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html'],['allure-playwright']],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: 'https://www.saucedemo.com/',
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'off',
    video: 'off',
    screenshot: 'only-on-failure',
    launchOptions: { slowMo: 1000 },
  },

  /* Configure projects for major browsers */
  projects: [
    //{ name: 'chromium', use: { ...devices['Desktop Chrome'] }},

    //{ name: 'firefox', use: { ...devices['Desktop Firefox'] }},

    //{ name: 'mobile', use: { ...devices['iPhone 13'] }},
    
    //{ name:'api', testMatch: /.*\.api\.ts/},
    //--- AUTH SETUPS ---
    {name:'setup-standard', testMatch:/auth\.standard\.setup\.ts/},
    {name:'setup-problem', testMatch:/auth\.problem\.setup\.ts/},
    {name:'setup-perf', testMatch:/auth\.perf\.setup\.ts/},

    //--- RBAC TEST PROJECTS ---
    {
      name:'sauce-standard',
      dependencies:['setup-standard'],
      testDir:'./tests/standard',
      use:{
        ...devices['Desktop Chrome'],
      storageState:'./playwright/.auth/standard_user.json'
    },
  },
{
      name:'sauce-problem', 
      dependencies:['setup-problem'],
      testDir:'./tests/problem',
      use:{
        ...devices['Desktop Chrome'],
        storageState:'./playwright/.auth/problem_user.json'
      },
  },
{
      name:'sauce-perf', 
      dependencies:['setup-perf'],
      testDir:'./tests/performance',
      use:{
        ...devices['Desktop Chrome'],
        storageState:'./playwright/.auth/perf.json'
      },
  },
  ],

    /*{
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },*/

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
