const { expect } = require("playwright/test");

// pageObjects/SearchPage.js
class SearchPage {

    constructor(page) {
        this.page = page;
        this.emailInput = page.locator('input#email');
        this.passwordInput = page.locator('input#password');
        this.submitButton = page.locator('button:has-text("Sign In")');
        this.invalidLoginMessage= page.locator('span.errorMessage-module__errorMessage__sARgC');
    }


async selectRandomProductFromSearchPage(){
    await this.page.waitForLoadState('load');
    //await this.page.waitForSelector('h1.searchPage-module__title__h2Evr');
    await this.page.waitForSelector('li.productGrid-module__product__qfskE, a.productCard_imageContainer__Xv4Q_');
    const listOfProducts = await this.page.$$('li.productGrid-module__product__qfskE, a.productCard_imageContainer__Xv4Q_');
    const count = await listOfProducts.length;
    console.log(`Found ${count} products`);
    
    const randomIndex = Math.floor(Math.random() * listOfProducts.length);
    await listOfProducts[randomIndex].click();
      const url = this.page.url()
      console.log('Product Url is : ', url)
}


}
module.exports = { SearchPage };