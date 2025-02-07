// pageObjects/OrderConfirmationPage.js
const { expect } = require("@playwright/test");

class OrderConfirmationPage {

    constructor(page) {
        this.page = page;
        this.getProductSize = page.locator('div:has-text("Size") + div');
        this.getProductQuantity = page.locator('div[class*="product-qty"]');
        this.getTotalAmount = page.locator('div.valign-cell.product-price > div');
        this.iframe = this.page.locator('iframe#Intrnl_CO_Container').contentFrame();
    }

    async getSizeOfProduct(){
        await this.page.locator('iframe#Intrnl_CO_Container').waitFor({state: 'visible'});
        const iframe = this.page.locator('iframe#Intrnl_CO_Container').contentFrame();
        if (iframe) {
              // Locate the div with "Size" text and get the following sibling's text content
              const productSizeLocator = iframe.locator('div.attr-key:has-text("Size:") + div');
          
              // Await textContent from the located element
              const productSize = await productSizeLocator.textContent();
              return productSize;            
    }
}

    async getQtyOfProduct(){
        //await this.page.locator('iframe#Intrnl_CO_Container').waitFor({state: 'visible'})
        const iframe = await this.page.locator('iframe#Intrnl_CO_Container').contentFrame();
        if (iframe) {
              // Locate the div with "Size" text and get the following sibling's text content
              const productQtyLocator = iframe.locator('div[class*="product-qty"]');
          
              // Await textContent from the located element
              const productQty = await productQtyLocator.textContent();
              return productQty;
            }       
    }

    async getTotalAmountOrderPage(){
        await this.page.locator('iframe#Intrnl_CO_Container').waitFor({state: 'visible'});
        const iframe = this.page.locator('iframe#Intrnl_CO_Container').contentFrame();
        if (iframe) {
              // Locate the div with "Size" text and get the following sibling's text content
              const value = iframe.locator('div.valign-cell.product-price > div');
          
              // Await textContent from the located element
              const trimdata = (await value.textContent()).replace(/\s+/g, '').replace(/[\u200B-\u200D\uFEFF]/g, '');
              return trimdata;       
        }
    }

    async summaryDetailsonConfirmationPage() {
        await this.page.waitForLoadState('load')
        const orderSummary = {};
        orderSummary.productQtyOrderPage = await this.getQtyOfProduct()
        orderSummary.productSizeOrderPage = await this.getSizeOfProduct()
        orderSummary.totalAmountOrderPage = await this.getTotalAmountOrderPage();
    
        // Log the order summary details
        console.log('Order Summary on Confirmation Page:', orderSummary);

        return orderSummary;
    }

    async compareCartVsOrderCompletionSummary (reviewOrderSummary, OrderSummary) {
       // expect.soft(reviewOrderSummary.productID).toEqual(OrderSummary.productID);
        expect.soft(reviewOrderSummary.productSize).toEqual(OrderSummary.productSizeOrderPage);
        expect.soft(reviewOrderSummary.productQty).toEqual(OrderSummary.productQtyOrderPage);    
        expect.soft(reviewOrderSummary.totalAmount).toEqual(OrderSummary.totalAmountOrderPage);
    }
}
module.exports = { OrderConfirmationPage };