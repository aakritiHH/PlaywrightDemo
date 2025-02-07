const { expect } = require("playwright/test");
const { BasePage} = require("../pageObjects/BasePage");
const { TestConfig } = require('../../config/configProperties');

const basePage = new BasePage();
// pageObjects/ProductPage.js
class ProductPage {

    constructor(page) {
        this.page = page;
       
        this.sizeDropDown = page.locator('div.sizeList-module__root__NszHY');
        this.firstSizeInDropDown = page.locator('#react-select-2-listbox > div:first-child')
        this.addToBagButton = page.locator('div.productFullDetail-module__productInfoActions__aeOrk, div.addToCartButton_productInfoAddToCart__FQurN')
        this.goToCartButton = page.locator('a[href*="cart"], span.cartTrigger_iconWrapper__s46Xv')
    }


async selectSizeFromDropDown(){
    await this.page.waitForSelector('div.sizeList-module__root__NszHY , div.tileList-tileList-wclp8, div.tileList_tileList__hVmHY');
    
    if(await this.page.locator('div.sizeList-module__root__NszHY').isVisible()){
       await this.sizeDropDown.click()
       console.log('Drop Down clicked')
    }
   
  await this.page.waitForLoadState('load');
  let sizes = 'div.sizeList-module__menuList__gBzDl.css-qr46ko div:not([aria-disabled="true"]), div.tileList-tileList-wclp8 > button[aria-disabled="false"][type="button"], div.tileList_tileList__hVmHY > button[aria-disabled="false"][type="button"]';
     await this.page.waitForSelector(sizes);
     const list = await this.page.$$(sizes)
     const index = basePage.randomElementSelection(list)
     await list[index].click();

    //await this.firstSizeInDropDown.click({ force: true });

}

async clickOnAddToBag(){
    await this.addToBagButton.click()
}

async clickOnGoToCartButton(){
    await this.goToCartButton.waitFor();
    if (await this.page.locator('div.productFullDetail-module__productInfoActions__aeOrk').isVisible()){
        await this.goToCartButton.click({ force: true });
    }else {
        await this.page.getByRole('link', { name: 'Go to cart' }).click()
        }
       // let country = TestConfig.country;
       // await expect(this.page).toHaveURL(`https://newstg.musto.com/${country}cart`);
}
}
module.exports = { ProductPage };