// pageObjects/HomePage.js
const { expect } = require('@playwright/test');


class HomePage {
    constructor(page, browser) {
        this.page = page;
        this.browser = browser;
        this.signInButton = page.locator('button#myaccount');
        this.acceptAllCookies=page.locator('#onetrust-accept-btn-handler');
        // commented locators are of https://staging-shop.hhworkwear.com/ website
        this.popUp_HH= page.locator('#onetrust-accept-btn-handler');
       /* this.searchInput = page.locator('input[name="search_query"]');
        this.submitSearch= page.locator('button[title="Submit search"]'); */
        this.searchLink = page.locator('div.searchField-module__root__oyvn0, [role="combobox"][aria-label="Search"]')
        this.searchInputBox = page.locator('input[name="q"]')
        this.submitSearch =  page.locator('form[autocomplete="off"] button[type="submit"]')
        this.shippingWorldWidePopUpSaveButton = page.locator('input[value="Save"]');
        this.signInButton = page.locator("a.accountTrigger-module__dropdownLink__PmBYM");
        this.shippingWorldWidePopUp= page.locator('div.glDefaultPopupContainer');
        this.continueToCountryButton = page.locator('input[value="Continue to shop"]');
        this.selectedCountry = page.locator('div#ge_ss0_1 span');
        this.geoLocationButton_HH = page.locator('button.storeSwitcherTrigger_storeSwitcherButtonSimple__mIhhr button_trigger__6IjRX')
    }

    async goToHomePage(url) {
         
        await this.page.goto(url) 
        await this.page.context().clearCookies();
        await this.page.evaluate(() => {
        window.localStorage.clear();
        window.sessionStorage.clear();
     });    
    }

    async clickOnAccountLink(){
        const accountLink= await this.signInButton
        await accountLink.click();
    }

    async acceptAllCookiesButton(){
        const acceptCookies= await this.acceptAllCookies
        await acceptCookies.click()
    }

    async closePopUpOnHomePage_HH(){             // Pop-up on home page landing https://staging-shop.hhworkwear.com/
        const closePopUp= await this.popUp_HH
        await closePopUp.click()
    }

    async waitForPageLoad(){
        await this.page.waitForTimeout(8000);
    }

    async clickShippingWorldWidePopUpSaveButton(){
        await this.page.waitForLoadState('domcontentloaded')
        try {
            await this.page.waitForSelector('input[value="Save"]', {timeout: 10000})
            //const isVisible = await this.shippingWorldWidePopUpSaveButton.isVisible()
        if (await this.shippingWorldWidePopUpSaveButton.isVisible()) {
          console.log('Shipping worldwide form is visible!');
          const saveButton= await this.shippingWorldWidePopUpSaveButton
          await saveButton.click();
          return;
        } 
        } catch (e) {
            console.log("Save button is not visible")
        }
           
    }

    async closeCountryConfirmationPopUp(){         
          await this.page.waitForLoadState('load');
          try{
           await this.page.waitForSelector('input[value="Continue to shop"]', {timeout: 10000})
            if(await this.continueToCountryButton.isVisible()){
                await this.continueToCountryButton.click()
                return;
            } 
          }catch(e){
            console.log('Waited for Continue to save button')
          }
            
    }

    async closeConfirmationPopUp_HH(){
        try{
            await this.page.waitForSelector('button[aria-label="I want to stay"]', {timeout: 10000})
             if(await this.page.locator('button[aria-label="I want to stay"]').isVisible()){
                await this.page.locator('button[aria-label="I want to stay"]').click();
                 return;
             } 
           }catch(e){
             console.log('Waited for I want to stay on this country pop up')
           }
        
    }

    async storeSwitcherPopUp(){
        try{
            const closeSwitcherPopup = '[class="storeSwitcher-module__content__I0kQ_"] div:nth-child(2) button.button-module__primary__OBtHD';
            //await this.page.waitForSelector('[class="storeSwitcher-module__buttonClose__oVYmg"]', {timeout: 10000})
           if(await this.page.locator(closeSwitcherPopup).isVisible()){
               await this.page.locator(closeSwitcherPopup).click();
               return;
           } 
         }catch(e){
           console.log('Close button in store switcher modal is not displayed')
         }
    }

    async clickonSearchIcon(isMobile){
       if(isMobile){
        console.log("in mobile view")
        await this.page.waitForSelector('div[class="searchTrigger_zoom__WHO5Q"] [aria-label="Search"]')
        await this.page.locator('div[class="searchTrigger_zoom__WHO5Q"] [aria-label="Search"]').click();
       }else{
      
        const combinedSearchLocator = this.page.locator('[role="combobox"][aria-label="Search"], input[placeholder="What are you looking for?"]');
        // Wait for either of the elements to be attached
        await combinedSearchLocator.waitFor({ state: 'attached' })
        await this.searchLink.waitFor({ state: "visible"})
        await this.searchLink.click();  
        }
    }
    
    async searchProductByKeyword(searchkeyword, isMobile){
        if(isMobile){
            console.log("in mobile view");
            await this.page.getByPlaceholder('Search ').fill(searchkeyword);
        }else
            await this.page.getByPlaceholder('What are you looking for?').fill(searchkeyword);
            await this.page.keyboard.press('Enter')
    }

    async selectRandomProduct(productData=[]) {
        const singleproduct = productData[Math.floor(Math.random() * productData.length)]
        console.log('product selected - ', singleproduct)
        return singleproduct
    }



    async verifySelectedCountry(countryName){
       // await this.selectedCountry.waitFor();
        const countrySelected = await this.selectedCountry.textContent();
        console.log("Expected value:", countryName);
        console.log("Actual value:", countrySelected);
        return countrySelected.includes(countryName);
    }  
    
    async addLoginDetailstoBrowserPopup_HH() {
        if (this.browser) {
            const context = await this.browser.newContext({
                httpCredentials: {
                    username: 'hh',
                    password: 'alive',
                },
            });

            const page = await context.newPage();  // Use the new context for a fresh page
            await page.goto('https://staging-shop3.hellyhansen.com/');
        } else {
            console.error('Browser is not defined');
        }
    }

    async changeGeoLocation(){
        await this.page.waitForLoadState('load');
        await expect(this.page.getByRole('button', { name: 'EN' })).toBeVisible();
        await this.page.getByRole('button', { name: 'EN' }).click();
        await expect(this.page.getByText('CloseYour RegionGlobalNorth')).toBeVisible();
        await this.page.getByLabel('Your Region').selectOption('Global');
        await this.page.getByRole('button', { name: 'Set Location' }).click();
        await this.waitForPageLoad()
        await this.page.waitForLoadState('load', { timeout: 10000 });
        if(await this.page.locator('h2.glTitle').isVisible() && await this.page.locator("h2.glTitle").textContent() == 'We ship to India'){
            await this.closeCountryConfirmationPopUp();    
         } else{
              await expect(this.page.locator('.glDefaultPopupContainer')).toBeVisible();
              await this.page.getByLabel('Change your shipping country').selectOption('IN');
              await this.page.getByRole('button', { name: 'Save' }).click();
              await this.closeCountryConfirmationPopUp();
         }          
    }

    async changeGeoLocation_HH(){
        await this.page.waitForLoadState('load');
        await expect(this.page.locator('svg.storeSwitcherTrigger_storeSwitcherFlag__JeA4Y')).toBeVisible();
        await this.page.locator('svg.storeSwitcherTrigger_storeSwitcherFlag__JeA4Y').click();

        //await expect(this.page.getByText('Please confirm your locationPlease be aware that changing countries will reload')).toBeVisible();
        await expect(this.page.locator('div.storeSwitcherForm_storeSwitcherFieldsButtonsWrapper__6yKE2')).toBeVisible({timeout:6000});
        await this.page.getByLabel('Your Region').selectOption('Global');
        await this.page.getByLabel('Your country').selectOption('Global');
        await this.page.locator('.storeSwitcherForm_storeSwitcherFieldsButtonsWrapper__6yKE2 > button').click();
        await this.page.waitForTimeout(10000)
        await this.page.waitForLoadState('load', { timeout: 10000 });

        if(await this.page.locator('h2.glTitle').isVisible() && await this.page.locator("h2.glTitle").textContent() == 'We ship to India'){
            await this.closeCountryConfirmationPopUp();    
         } else if(await this.page.locator('h2.glTitle').isVisible()){
              await expect(this.page.locator('.glDefaultPopupContainer')).toBeVisible();
              await this.page.getByLabel('Change your shipping country').selectOption('IN');
              await this.page.getByRole('button', { name: 'Save' }).click();
              await this.closeCountryConfirmationPopUp();
         }    
    }
}
module.exports = { HomePage };