const { chromium } = require('playwright');

class BrowserManager {
    constructor() {
        this.browser = null;
        this.context = null;
        this.page = null;
    }

    // Launch the browser, create a context and page
    async launchBrowser() {
        // Launch the browser (you can use other browsers like firefox or webkit)
        this.browser = await chromium.launch();

        // Create a new context (isolated browsing session)
        this.context = await this.browser.newContext({
            httpCredentials: { username: 'hh', password: 'alive' },  // Authentication if needed
        });

        // Create a new page (tab) in the browser
        this.page = await this.context.newPage();
        console.log('[INFO] Browser launched and new page created.');

        return this.page; // Return the page object so it can be used in the test
    }

    // Close the browser after test execution
    async closeBrowser() {
        if (this.browser) {
            await this.browser.close();
            console.log('[INFO] Browser closed.');
        }
    }
}

module.exports = {BrowserManager};
