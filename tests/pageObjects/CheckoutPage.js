const { expect } = require("playwright/test");
const { HomePage} = require("../pageObjects/HomePage"); 
let homePage = null;

// pageObjects/CheckoutPage.js
class CheckoutPage {

    constructor(page) {
        this.page = page;
         homePage = new HomePage(page);
        this.firstNameInput = page.locator('div#billingFirstName input');
        this.lastNameInput = page.locator('input#CheckoutData_BillingLastName');
        this.emailInput = page.locator('input#CheckoutData_Email')
        this.addressLine1Input= page.locator('input#CheckoutData_BillingAddress1')
        this.citySuburbInput = page.locator('input#BillingCity')
        this.zipCodeInput = page.locator('input#BillingZIP')
        this.phoneNumberInput = page.locator('input#CheckoutData_BillingPhone')
        this.paypalPaymentLink = page.locator('span[data-title=PayPal]')
        this.payWithPaypalButton = page.locator('button#btnPay')
        this.payPalAddEmail = page.locator('input#email')
        this.nextButtonOnPayPalPage = page.locator('button#btnNext')
        this.passwordPayPalInput = page.locator('input#password')
        this.loginPayPalButton = page.locator('button#btnLogin')
        this.completeThePurchaseOnPayPal = page.locator('button#payment-submit-btn')


    }
    

    async fillBillingAddressDetailsAndNavigateToPayPal(billingAddress={}){
        await this.page.waitForTimeout(5000)
        await this.page.locator('iframe#Intrnl_CO_Container').waitFor({state: 'visible'});
        const iframeElement = await this.page.locator('iframe#Intrnl_CO_Container');
        const iframe = await iframeElement.contentFrame();
        if (iframe) {
            await iframe.locator('#productContainer').waitFor();
        await expect.soft(iframe.getByLabel('Order Summary')).toBeVisible();
        await expect.soft(iframe.locator('#productContainer')).toBeVisible();

        console.log("Data from testdata file ....", billingAddress.firstName)
        await iframe.locator('div#billingFirstName input').fill(billingAddress.firstName, {timeout: 10000})
        await iframe.locator('input#CheckoutData_BillingLastName').fill(billingAddress.lastName)
        await iframe.locator('input#CheckoutData_Email').fill(billingAddress.email)
        await iframe.locator('input#CheckoutData_BillingAddress1').fill(billingAddress.address)
        await iframe.locator('input#BillingCity').fill(billingAddress.city)
        await iframe.locator('input#BillingZIP').fill(billingAddress.postalCode)
        await iframe.locator('input#CheckoutData_BillingPhone').fill(billingAddress.phoneNumber)
        homePage.waitForPageLoad()
        //await this.page.waitForLoadState('load');
        await iframe.locator('#secureWindow').contentFrame().getByRole('textbox', { name: 'Card number' }).toBeVisible();
        await iframe.locator('span[data-title=PayPal]').waitFor({ state: "visible", timeout: 60000})
        await iframe.locator('span[data-title=PayPal]').click()
        await iframe.locator('[id="paypalConfirmText"]').waitFor({ state: "visible", timeout: 60000});
        await expect(iframe.locator('[id="paypalConfirmText"]')).toBeVisible();
        await this.page.waitForLoadState('load');
        homePage.waitForPageLoad()
        
        try {
           
            await iframe.locator('button#btnPay').waitFor({state: 'visible', timeout: 60000});
            await expect(iframe.locator('button#btnPay')).toBeVisible();
            await iframe.locator('button#btnPay').click({ force: true })
        } catch (e) {
           console.log("Couldn't click on pay with pay pal");
           if(await iframe.locator('button#btnPay').isVisible()){      
            await iframe.locator('button#btnPay').waitFor({state: 'visible'})
            await iframe.locator('button#btnPay').click({ force: true })
        }
        }
       homePage.waitForPageLoad()
        if(await iframe.locator('button#btnPay').isVisible()){      
            await iframe.locator('button#btnPay').waitFor({state: 'visible'})
            await iframe.locator('button#btnPay').click({ force: true })
        }
    
        }
    }

 /*   async clickOnPayPalPaymentLink(){
        const iframeElement = await this.page.locator('iframe#Intrnl_CO_Container');
        const iframe = await iframeElement.contentFrame();
        if (iframe) {
            await iframe.locator('span[data-title=PayPal]').click()
            await iframe.locator('button#btnPay').click()
        }
    }

    async clickOnPayWithPayPalPaymentButton(){
        const iframeElement = await this.page.locator('iframe#Intrnl_CO_Container');
        const iframe = await iframeElement.contentFrame();
        if (iframe) {
            await iframe.locator('button#btnPay').click()
        }
    } */

    async paypalLoginAndOrderConfirmation(){

        await this.payPalAddEmail.waitFor({state: 'visible',timeout: 30000})
        await this.payPalAddEmail.fill('Buyer-PayPalEURO@hellyhansen.com')
        await this.nextButtonOnPayPalPage.click()
        await this.passwordPayPalInput.fill('PayPalTest24!')
        await this.loginPayPalButton.click()
        await this.page.locator('button#payment-submit-btn');
        await this.completeThePurchaseOnPayPal.click()

    }
}
module.exports = { CheckoutPage };