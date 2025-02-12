const { count } = require("console");
const { expect } = require("playwright/test");
const { HomePage } = require('../pageObjects/HomePage');

// pageObjects/SearchPage.js
class SearchPage {
    

    constructor(page) {
        this.page = page;
        this.emailInput = page.locator('input#email');
        this.passwordInput = page.locator('input#password');
        this.submitButton = page.locator('button:has-text("Sign In")');
        this.invalidLoginMessage= page.locator('span.errorMessage-module__errorMessage__sARgC');
       
    }

    async captureCountOfProducts(){
        let totalCount = '[class="filterBar_totalItemsLabel__o6v3s"]';
        await this.page.waitForSelector(totalCount, {timeout: 6000});
       
        var count = await this.page.innerText(totalCount);
        count = count.replace(/\n+/g, '').trim();
   
        console.log(count)
        return count
    }

async selectRandomfilter(){
    await this.page.waitForLoadState('load');


    const filters = '[class="filterList_filterItems__dG6XO filterList_filterItemsColors__V8pC3"] label svg';
    
    await this.page.waitForSelector(filters);
    const filterList = await this.page.$$('[class="filterList_filterItems__dG6XO filterList_filterItemsColors__V8pC3"] label svg');
    const count = await filterList.length;
    console.log(`Found ${count} filters`);
    
    const randomIndex = Math.floor(Math.random() * filterList.length);
    await filterList[randomIndex].click();

   // Find the parent label of the randomly selected SVG
        const selectedLabel = await filterList[randomIndex].evaluate((svgElement) => {
            // Get the parent label of the SVG element
            const label = svgElement.closest('label');
            return label ? label.textContent.trim() : null; // Return the text content of the label
        });
    
      const filterNameApplied = '[class="filterPreview_previewList__yk05O"] button';
       var nameOfAppliedFilter = await this.page.innerText(filterNameApplied);
      
       expect(nameOfAppliedFilter).toContain(selectedLabel);

      
}

async searchPageValidationAfterApplyingFilters(valueBeforeFilter){
    await this.page.waitForLoadState('domcontentloaded');
    //check if active filters section is displayed
    await this.page.locator('[class="filterPreview_preview__d92Z_"]').waitFor({state: 'visible'});
    await expect(this.page.locator('[class="filterPreview_preview__d92Z_"]')).toBeVisible();

    await this.page.waitForSelector('li.productGrid-module__product__qfskE, a.productCard_imageContainer__Xv4Q_');
    
    //await this.page.waitForTimeout(6000);


    const valueAfterFilter=  await this.captureCountOfProducts();
    console.log(valueAfterFilter)

    expect(valueBeforeFilter).not.toBe(valueAfterFilter);

}

async searchPageValidationBasedOnKeyword(searchkeyword){
        
    var searchText = 'h1.heading_default__PX0IL.heading_style--h1__Dnkyg';

    await this.page.locator(searchText).waitFor({state: 'visible'});

    searchText = await this.page.innerText(searchText);
    searchText.replace(/\n+/g, '').trim();
    expect(searchText).toContain(searchkeyword); 

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