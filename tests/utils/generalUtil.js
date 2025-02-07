const fs = require('fs');
const { expect } = require('@playwright/test');

/**
 * Captures a screenshot of the current page state.
 * @param {import('@playwright/test').Page} page - The Playwright page object.
 * @param {string} fileName - The name of the file to save the screenshot as.
 */
async function captureScreenshot(page, fileName) {
  await page.screenshot({ path: `./screenshots/${fileName}.png` });
}

/**
 * Logs into an application given a username and password.
 * Assumes the login form selectors are known.
 * @param {import('@playwright/test').Page} page - The Playwright page object.
 * @param {string} url - URL to the login page.
 * @param {string} username - The username for login.
 * @param {string} password - The password for login.
 */
async function login(page, url, username, password) {
  await page.goto(url);
  await page.fill('username-locator', username);
  await page.fill('passowrd-locator', password);
  await page.click('button-locator"');
  // Add a check to ensure login was successful
  await expect(page).toHaveURL(/dashboard/); // Adjust based on your app's logic
}

/**
 * Navigates to a URL with retries on failure.
 * @param {import('@playwright/test').Page} page - The Playwright page object.
 * @param {string} url - The URL to navigate to.
 * @param {number} [retries=3] - Number of retries.
 */
async function navigateWithRetry(page, url, retries = 3) {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      await page.goto(url, { waitUntil: 'networkidle' });
      return; // Navigation successful, exit the function
    } catch (error) {
      console.log(`Navigation to ${url} failed, attempt ${attempt + 1} of ${retries}`);
      if (attempt === retries - 1) throw error; // Re-throw error on last attempt
    }
  }
}

/**
 * Generates a unique string based on the current timestamp. Useful for creating unique test data.
 * @returns {string} A unique string.
 */
function generateUniqueString() {
  return `test-${Date.now()}`;
}

/**
 * Writes data to a JSON file in the specified path.
 * @param {string} filePath - The file path to write the data to.
 * @param {Object} data - The data to write to the file.
 */
function writeJsonToFile(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = {
  captureScreenshot,
  login,
  navigateWithRetry,
  generateUniqueString,
  writeJsonToFile,
};