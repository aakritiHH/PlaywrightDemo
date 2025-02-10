const { expect } = require("playwright/test");
var valueBeforeFilter


// pageObjects/SearchPage.js
class SearchPage {
    

    constructor(page) {
        this.page = page;
        this.emailInput = page.locator('input#email');
        this.passwordInput = page.locator('input#password');
        this.submitButton = page.locator('button:has-text("Sign In")');
        this.invalidLoginMessage= page.locator('span.errorMessage-module__errorMessage__sARgC');
       
    }

async selectRandomfilter(){
    await this.page.waitForLoadState('load');

    let totalCount = '[class="filterBar_totalItemsLabel__o6v3s"]';

     valueBeforeFilter = await this.page.innerText(totalCount);
    valueBeforeFilter = valueBeforeFilter.replace(/\n+/g, '').trim();

    console.log(valueBeforeFilter)

    const filters = '[class="filterList_filterItems__dG6XO filterList_filterItemsColors__V8pC3"] label svg';
    
    await this.page.waitForSelector(filters);
    const filterList = await this.page.$$('[class="filterList_filterItems__dG6XO filterList_filterItemsColors__V8pC3"] label svg');
    const count = await filterList.length;
    console.log(`Found ${count} filters`);
    
    const randomIndex = Math.floor(Math.random() * filterList.length);
    await filterList[randomIndex].click();
      const url = this.page.url()
      console.log('Product Url is : ', url)

      return valueBeforeFilter;
}

async searchPageValidationAfterApplyingFilters(){
    await this.page.waitForLoadState('load');
    await this.page.locator('[class="filterPreview_preview__d92Z_"]').waitFor({state: 'visible'});
    await expect(this.page.locator('[class="filterPreview_preview__d92Z_"]')).toBeVisible();

    let totalCount = '[class="filterBar_totalItemsLabel__o6v3s"]';

    var valueAfterFilter = await this.page.innerText(totalCount);
    valueAfterFilter = valueAfterFilter.replace(/\n+/g, '').trim();

    console.log(valueAfterFilter)

    expect(valueBeforeFilter).not.toBe(valueAfterFilter); 


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