
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

let browser;
let page;

// Helper function to capture screenshots
const captureScreenshot = async (testName) => {
  const screenshotPath = path.resolve(__dirname, 'screenshots', `${testName}.png`);
  await page.screenshot({ path: screenshotPath });
  console.log(`Screenshot saved at: ${screenshotPath}`);
};

// Before all tests (setup)
beforeAll(async () => {
  
  
  });


afterEach(async () => {
    if (expect.getState().currentTestName && expect.getState().currentTestResult.status === 'failed') {
      await captureScreenshot(expect.getState().currentTestName);
    }
  });
  