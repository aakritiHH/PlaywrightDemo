const { test, expect, chromium } = require('@playwright/test');
const { HomePage } = require('../pageObjects/HomePage');
const { LoginPage } = require('../pageObjects/LoginPage');
const { SearchPage } = require('../pageObjects/SearchPage');
const { ProductPage } = require('../pageObjects/ProductPage');
const { CartPage } = require('../pageObjects/CartPage');
const { CheckoutPage } = require('../pageObjects/CheckoutPage');
const { OrderConfirmationPage } = require('../pageObjects/OrderConfirmationPage');
const { TestConfig } = require('../../config/configProperties')
const urlDetails = require('../testData/urldetails.json');
const productData = require('../testData/productData.json');
const { BasePage } = require('../pageObjects/BasePage');
const { BrowserManager } = require('../helperclasses/BrowserManager');
const { PageObjectManager } = require('../helperclasses/PageObjectManager');
const basePage = new BasePage();


//set the environment variables TEST_ENV appropriately
const environment = process.env.TEST_ENV != null ? process.env.TEST_ENV : TestConfig.TEST_ENV; // "qa" or "staging"
console.log(`Current working directory: ${process.cwd()}`);

// The commented line will be uncommented while pushing the code to Github
const testDataFilePath = `../testData/${environment}TestData.js`;
console.log(`Attempting to load: ${testDataFilePath}`);

const testData = require(testDataFilePath);

test('Verify the Size and fit modal is displayed properly', {tag:['@search']}, async () =>{
    const browserManager = new BrowserManager();
    const page = await browserManager.launchBrowser();  // Launch the browser and get the page

    const pageObjectManager = new PageObjectManager(page);

    const homePage = pageObjectManager.getHomePage();
    const searchPage = pageObjectManager.getSearchPage();
    const searchKeyword = productData.productData.productskeywords;

    console.log('[INFO] Test Case starts.....')
    console.log('[INFO] Navigate to the URL.....')

    const url = urlDetails.hellyhansenproduction.url;
    console.log("url is" + url)
   // let url = basePage.urlFormation();
    await homePage.goToHomePage(url);

// Get site key from the page
const siteKey = await page.$eval('.g-recaptcha', el => el.getAttribute('data-sitekey'));

// Request CAPTCHA solving
const response = await axios.post('https://api.capsolver.com/solve', {
  clientKey: 'CAP-D40CE64328A8C835B0ECCBE176C4117F8646AD7AA9FF2BE6D1D6B137C64B13E4', // Replace with your Capsolver API key
  task: {
    type: 'ReCaptchaV2Task',
    websiteURL: page.url(),
    websiteKey: siteKey
  }
});

const taskId = response.data.taskId;

// Check task status
let solution;
while (!solution) {
  const result = await axios.post('https://api.capsolver.com/getTaskResult', {
    clientKey: 'CAP-D40CE64328A8C835B0ECCBE176C4117F8646AD7AA9FF2BE6D1D6B137C64B13E4', // Replace with your Capsolver API key
    taskId: taskId
  });

  if (result.data.status === 'ready') {
    solution = result.data.solution.gRecaptchaResponse;
  } else {
    await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds before retrying
  }
}

// Enter the CAPTCHA solution
await page.evaluate(`document.getElementById('g-recaptcha-response').innerHTML='${solution}';`);
await page.click('#submit'); // Adjust the selector as needed



    
    await homePage.closePopUpOnHomePage_HH()
    console.log('[SUCCESS] Accept cookies Pop-up closed Successful.....')
    await homePage.closeCountryConfirmationPopUp();
    console.log('[SUCCESS] Country confirmation pop-up closed successfully.....')
    await homePage.closeConfirmationPopUp_HH();

    await homePage.clickonSearchIcon();
    await homePage.searchProductByKeyword('65909');
    console.log('[SUCCESS] Landed on Search page.....');

    await searchPage.selectRandomProductFromSearchPage();
    console.log('[SUCCESS] Landed on PDP.....');

});