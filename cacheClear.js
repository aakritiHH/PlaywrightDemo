// clearCache.js
const fs = require('fs');
const path = require('/Users/roopam.sharma/Desktop/Project-HH/HellyHanson-Framework/cacheClear.js');

// Define the path to the user data directory used by Playwright
const userDataDir = path.join(__dirname, 'user_data');

// Remove the user data directory and its contents
if (fs.existsSync(userDataDir)) {
  fs.rmSync(userDataDir, { recursive: true, force: true });
  console.log('Cache and session data cleared!');
} else {
  console.log('No cache or user data directory found.');
}