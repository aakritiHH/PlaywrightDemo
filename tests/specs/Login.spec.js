import { chromium } from "playwright-extra"

import StealthPlugin from "puppeteer-extra-plugin-stealth"
const { test } = require('@playwright/test');
const { HomePage } = require('../pageObjects/HomePage');
const { LoginPage } = require('../pageObjects/LoginPage');

test('TC02 : Homepage > Verify the Login functionality',{tag : ['@login, @loginNew']}, async function({})  {
  

    // register the Stealth plugin

    chromium.use(StealthPlugin())

    // set up the browser and launch it

    const browser = await chromium.launch()

    // open a new blank page

    const page = await browser.newPage()

    // navigate to the target page

    const homePage = new HomePage(page)
    const loginPage= new LoginPage(page)

   // await page.goto("https://bot.sannysoft.com/")
     
    console.log('[INFO] Navigate to the URL.....')
   // const url = urlDetails.mustostg.url;
    await homePage.goToHomePage('https://newstg.musto.com/'); // Navigate to the home page
    console.log('[SUCCESS] URL Launch Successful.....')
    await homePage.acceptAllCookiesButton(); // Close the cookies banner in footer
    console.log('[SUCCESS] Accept cookies banner closed succesfully.....')
    await homePage.clickShippingWorldWidePopUpSaveButton(); //Save the country bydefault selected on Now shipping worldwide!
    console.log('[SUCCESS] Pop-up closed Successful.....')
    await homePage.closeCountryConfirmationPopUp();
    console.log('[SUCCESS] Confirmation Pop-up closed Successful.....')
    await homePage.clickOnAccountLink();
    console.log('[SUCCESS] Clicked on Sign in Link.....')
    //await loginPage.verifyLoginPage();
    console.log('[SUCCESS] Login page loaded Successful.....')
    await loginPage.login()
    console.log('[SUCCESS] Entered invalid credentials......')
    await loginPage.verifyInvalidLoginMessage()
    console.log('[SUCCESS] Invalid credentials validated......')

    

    // take a screenshot of the entire page

    await page.screenshot({

        path: "results.png",

        fullPage: true

    })

    // close the browser and release its resources

    await browser.close()

})