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
const basePage = new BasePage();

//set the environment variables TEST_ENV appropriately
const environment = process.env.TEST_ENV != null ? process.env.TEST_ENV : TestConfig.TEST_ENV; // "qa" or "staging"
console.log(`Current working directory: ${process.cwd()}`);

// The commented line will be uncommented while pushing the code to Github
const testDataFilePath = `../testData/${environment}TestData.js`;
console.log(`Attempting to load: ${testDataFilePath}`);

const testData = require(testDataFilePath);

test('Search functionality', {tag:['@search']}, async () =>{
    const browser = await chromium.launch();  // Launch the browser
  
    const context = await browser.newContext({
        httpCredentials: {
            username: 'hh',
            password: 'alive',
        },
    });

    const page = await context.newPage();  // Use the new context for a fresh page
    console.log('[INFO] Test Case starts.....')
    console.log('[INFO] Navigate to the URL.....')

    const homePage = new HomePage(page)
    const searchPage = new SearchPage(page)
    const searchKeyword = productData.productData.productskeywords;

    const url = urlDetails.hellyhansenstg.url;
    console.log("url is" + url)
   // let url = basePage.urlFormation();
    await homePage.goToHomePage(url);

  
    await homePage.closePopUpOnHomePage_HH()
    console.log('[SUCCESS] Pop-up closed Successful.....')
    await homePage.closeCountryConfirmationPopUp();
    console.log('[SUCCESS] Country confirmation pop-up.....')

    if(await page.getByLabel('I want to stay').isVisible()){
        await page.getByLabel('I want to stay').click();
    }

    await homePage.clickonSearchIcon();
    await homePage.searchProductByKeyword(searchKeyword);
    console.log('[SUCCESS] Landed on Search page.....')

    await searchPage.searchPageValidationBasedOnKeyword(searchKeyword);
   
   await searchPage.selectRandomfilter();
   await searchPage.searchPageValidationAfterApplyingFilters();

});


test('Place an order using paypal as payment type', { tag: ['@HH', '@OrderConfirmation'] }, async () => {
    const browser = await chromium.launch();  // Launch the browser
  
            const context = await browser.newContext({
                httpCredentials: {
                    username: 'hh',
                    password: 'alive',
                },
            });

            const page = await context.newPage();  // Use the new context for a fresh page
            console.log('[INFO] Test Case starts.....')
            console.log('[INFO] Navigate to the URL.....')

            const homePage = new HomePage(page)
            const searchPage = new SearchPage(page)
            const productPage = new ProductPage(page)
            const cartPage = new CartPage(page)
            const checkoutPage = new CheckoutPage(page)
            const orderConfirmationPage = new OrderConfirmationPage(page)
            const searchKeyword = productData.productData.productskeywords;

            const url = urlDetails.hellyhansenstg.url;
            console.log("url is" + url)
           // let url = basePage.urlFormation();
            await homePage.goToHomePage(url);

          
            await homePage.closePopUpOnHomePage_HH()
            console.log('[SUCCESS] Pop-up closed Successful.....')
            await homePage.closeConfirmationPopUp_HH();
            await homePage.closeCountryConfirmationPopUp();
            console.log('[SUCCESS] Country confirmation pop-up closed.....')

            await homePage.clickonSearchIcon();
            await homePage.searchProductByKeyword(searchKeyword);
            console.log('[SUCCESS] Landed on Search page.....')
            await searchPage.selectRandomProductFromSearchPage();
            console.log('[SUCCESS] Landed on Product page.....')
            await productPage.selectSizeFromDropDown();
            await productPage.clickOnAddToBag()
            await productPage.clickOnGoToCartButton()
            console.log('-------get the review ordersummary details in cart page------')
            const reviewOrderSummary = await cartPage.getOrderValuesFromCartPage(); //get the order summary details from cart page

            // Proceed to checkout and complete order
            await cartPage.proceedToCheckout();
            await checkoutPage.fillBillingAddressDetailsAndNavigateToPayPal(testData.billingAddress)
            await checkoutPage.paypalLoginAndOrderConfirmation()

            console.log('-------get the ordersummary details from from order confirmation page-----')
            const OrderSummary = await orderConfirmationPage.summaryDetailsonConfirmationPage();// get the order summary details from order confirmation page
            console.log('-------verify order summary details from Order review page and order Confirmation page------')

            // Compare the order summary details
            await orderConfirmationPage.compareCartVsOrderCompletionSummary(reviewOrderSummary, OrderSummary);
            console.log('------Test Case Ends------');

});

