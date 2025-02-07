
const {  expect, chromium, firefox } = require('@playwright/test') ;
//const { ai } = require('@zerostep/playwright');
const { timeout } = require('../../playwright.config');
const { HomePage} = require("../pageObjects/HomePage"); 
const { test } = require('./test-fixture');


test('sample test', async ({page})=>{
await page.goto('https://staging-shop3.hellyhansen.com/en_us/');

});


test('sample for ai using zero step', async({page})=>{

    await page.goto('https://playwright.dev/');

    await ai('Click on get started button', {page, test});
    await ai('Click on search icon', {page,test});

});

test.only('open helly hansen website and do some operations', async({page, ai})=>{
    const homePage = new HomePage(page);

    await page.goto('https://newstg.musto.com/');

    await ai('Wait for the cookie banner to appear');
    await ai('Accept the cookies');
    await homePage.waitForPageLoad();
    
    await ai('Wait for save button in now shipping world wide modal');
    await ai('click on save button in now shipping world wide modal');
    await page.waitForLoadState( 'load');
    await homePage.waitForPageLoad();
   
    await ai('Wait for continue to shop button and click on continue to shop button if visible')
    console.log('clicked on continue to shop button')
    await homePage.waitForPageLoad();
    
    await ai('click on brand logo')
    
    await page.evaluate(() => window.scrollTo(0, 0));

    await ai('Hover over mens category')
    console.log('hovered on mens')
    await ai('Click on any sub links under the flyout of hovered mens');
    console.log('Navigated to category page');
    //await homePage.waitForPageLoad();

    await ai('Click on any product image');
    const name = await ai('What is the name of product?', { page, test })

    console.log('Product name is: ', name)
    console.log('In product page');
    await page.waitForSelector('h1.productFullDetail-module__productName__uLSUF');
    await ai('Click on choose a size drop down');
    await ai('Select any random size from enabled sizes')
    await ai('Wait until the selected size is displayed in choose a size drop down')
    await ai('Click on add to bag button' );
});

test('open helly hansen', async({page})=>{
    await page.goto('https://staging-shop3.hellyhansen.com/en_us');

    await ai('Enter value in username of browser context as hh', {page, test});
    await ai('Enter value in password of browser context as alive', {page,test});
    await ai('Click on sign in', {page, test});



});