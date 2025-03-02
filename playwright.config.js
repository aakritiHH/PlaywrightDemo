// @ts-check
const { defineConfig, devices } = require('@playwright/test');
const { on } = require('events');
import { testPlanFilter } from "allure-playwright/dist/testplan";
import * as os from "os";
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  timeout : 180000,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 4 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [["html"],
    ["allure-playwright",
      {
        detail: true,
        outputFolder: "allure-results",
        environmentInfo: {
          os_platform: os.platform(),
          os_release: os.release(),
          os_version: os.version(),
          node_version: process.version,
        },
      },
    ],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',
    screenshot: {mode: 'on', fullPage: true},
    video: 'on',
    //baseURL : "https://staging-shop.hhworkwear.com/",
    headless : true,
    ignoreHTTPSErrors: true,
    //browserName : "chromium",
    //...devices['Desktop Chrome']
  },

  /* Configure projects for major browsers */
  projects: [
    // {
    //   name: 'incognito',
    //   use: {
    //     // Use a custom browser context to simulate incognito mode
    //     contextOptions: {
    //       storageState: 'incognito.json',
    //       viewport: { width: 1280, height: 720 },
    //       // Other settings you may want to configure
    //     }
    //   }
    // },
     {
       name: 'chromium',
       use: { ...devices['Desktop Chrome'] },
     },

     {
       name: 'firefox',
       use: { ...devices['Desktop Firefox'] ,

       },
     },

     {
      name: 'webkit',
       use: { ...devices['Desktop Safari'] ,
         viewport: { width: 1280, height: 720 },
       },
     },

  //   /* Test against mobile viewports. */
      {
        name: 'Mobile Chrome',
        use: { ...devices['Pixel 5'],
        browserName: 'chromium', 
        channel: 'msedge',
        isMobile: true,
        viewport: { width: 375, height: 667 },
      },
    },
    
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'],
        browserName: 'webkit', // can pass webkit or chromium
        isMobile: true,
        // Set the viewport size smaller for faster tests
        viewport: { width: 375, height: 667 },
       },
      
    },

   //   /* Test against branded browsers. */
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
  //   {
  //     name: 'Google Chrome',
  //     use: { ...devices['Desktop Chrome'], channel: 'chrome' },
  //   },
  ],

  
  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

