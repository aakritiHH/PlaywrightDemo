//Basic example to show the page object class

class CartPage {
    constructor(page) {
        this.page = page;
        this.checkoutButton = page.locator('a.checkout-btn[role=button][href*=cart]:visible');
        this.proceedToCheckoutButton = page.locator('div.cart-module__topActions__bQ3BQ a, div.priceSummary_buttonWrapper__pj0yO > a');
        this.productIDCapture = page.locator('td.item-module__details__VKjWG span')
        this.productSizeCapture = page.locator('td.item-module__details__VKjWG dt:has-text("Size :") + dd, div.product_productRow__j6avo dt:has-text("Size:") + dd')
    }

    async proceedToCheckout() {
        //await this.checkoutButton.click({force:true});
        try {
        await this.proceedToCheckoutButton.click({ force: true });
        } catch(e){
            console.log('Not able to click Proceed to checkout button',e)
        }
    }

    async captureProductIdFromCartPage(){
        await this.productIDCapture.waitFor({ state: "attached" })
        const productID = await this.productIDCapture.textContent()
        return productID;
     
    }

    async captureProductSizeFromCartPage(){
        const productSize = await this.productSizeCapture.textContent()
        console.log('Size from bag page.....', productSize)
        return productSize;
     
    }

    async captureProductQtyFromCartPage(){
        // Fetch the value from the input
        const qtySelected = await this.page.locator('input.quantity-module__input__zjN5m, div.product_productCellQty___NzJQ.product_cell__xhfwi input[field="quantity"]').getAttribute('value');
        console.log('Quantity from bag page.....', qtySelected); 
        return qtySelected;
     
    }

    async captureTotalAmountFromCartPage(){
        await this.page.waitForSelector('td.price-summary-total, div.product_price__mxrO4',{timeout: 10000});
        const fullPrice = await this.page.locator('td.price-summary-total, div.product_price__mxrO4').getAttribute('ge-data-converted-full-price');
        const priceTotal1 = fullPrice.replace(/,/g, '');
        const priceTotal = priceTotal1.replace(/\s+/g, '');
        const trimPrice = priceTotal.replace(/[\u200B-\u200D\uFEFF]/g, '');
        console.log('Total amount from bag page.....', trimPrice);
        return trimPrice; 
    }

    async getOrderValuesFromCartPage() {
        const reviewOrderSummary = {};
        // Retrieve order summary details
       // reviewOrderSummary.productID = await this.captureProductIdFromCartPage()
        reviewOrderSummary.productSize = await this.captureProductSizeFromCartPage()
        reviewOrderSummary.productQty = await this.captureProductQtyFromCartPage()
        reviewOrderSummary.totalAmount = await this.captureTotalAmountFromCartPage()

        // Log the order summary details
        console.log('Order Summary on Cart Page:', reviewOrderSummary);
        return reviewOrderSummary;
    }
}

module.exports = { CartPage };