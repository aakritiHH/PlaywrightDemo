const { test, expect, chromium } = require('@playwright/test');
const { HomePage } = require('../pageObjects/HomePage');
const { BasePage } = require('../pageObjects/BasePage');
const { TestConfig } = require('../../config/configProperties')
const  urlDetails  = require('../testData/urldetails.json');
const productData = require('../testData/productData.json');

//set the environment variables TEST_ENV appropriately
const environment = process.env.TEST_ENV?TEST_ENV : 'qa'; // "qa" or "staging"
console.log(`Current working directory: ${process.cwd()}`);

console.log('trying to load test data file');
// The commented line will be uncommented while pushing the code to Github
const testDataFilePath = `../testData/${environment}TestData.js`;
console.log(`Attempting to load: ${testDataFilePath}`);

//const testData = require(testDataFilePath);


test('TC01',{tag : ['@regression']}, async ({ page }) => {

    const homePage = new HomePage(page)
     
    console.log('Smoke and sanity test executed')
    console.log('[INFO] Test Case starts.....')
    console.log('[INFO] Navigate to the URL.....')
    await homePage.goToHomePage(); // Navigate to the home page
    console.log('[SUCCESS] URL Launch Successful.....')
    await homePage.closePopUpOnHomePage(); //Will close the pop-up on homepage
    await homePage.searchForProductByName(testData.productData.productskeywords)
    console.log('[SUCCESS] Search Successful.....')

});