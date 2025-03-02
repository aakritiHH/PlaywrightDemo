//Create a base page class and provide all common functions and extend to the other page classes

const { expect } = require("playwright/test");
const  urlDetails  = require('../testData/urldetails.json');
const { TestConfig } = require('../../config/configProperties')

class BasePage {

     // Wait for element visibility before interacting
     async  waitForElementVisible(page, locator) {
        await page.waitForSelector(locator, { state: 'visible' });
        console.log(`[SUCCESS] Element is visible: ${locator}`);
    }
  
    randomElementSelection(elementList) {
        if(elementList.length == 1){
            return 0;
        }else {
            const index = Math.floor(Math.random() * elementList.length);
            return index;
        }
    }

     urlFormation(){
        const brand = {
            "HH":  urlDetails.hellyhansenproduction.url,
            "HHstg": urlDetails.hellyhansenstg.url,
            "mustostg": urlDetails.mustostg.url,
            "musto": urlDetails.musto.url

        }
        
        let url =  brand[TestConfig.brand];
         url = url + TestConfig.country
    
         console.log("url is" + url)
         return url;
    }
   
   
   
}

module.exports = {BasePage};