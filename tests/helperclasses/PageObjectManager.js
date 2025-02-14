const { HomePage } = require('../pageObjects/HomePage');
const { LoginPage } = require('../pageObjects/LoginPage');
const { SearchPage } = require('../pageObjects/SearchPage');
const { ProductPage } = require('../pageObjects/ProductPage');
const { CartPage } = require('../pageObjects/CartPage');
const { CheckoutPage } = require('../pageObjects/CheckoutPage');
const { OrderConfirmationPage } = require('../pageObjects/OrderConfirmationPage');

class PageObjectManager {
    constructor(page) {
        this.page = page;
    }

    getLoginPage(){
        return new LoginPage(this.page);
    }

    getHomePage() {
        return new HomePage(this.page);
    }

    getSearchPage() {
        return new SearchPage(this.page);
    }

    getProductPage() {
        return new ProductPage(this.page);
    }

    getCartPage() {
        return new CartPage(this.page);
    }

    getCheckoutPage() {
        return new CheckoutPage(this.page);
    }

    getOrderConfirmationPage() {
        return new OrderConfirmationPage(this.page);
    }
}


module.exports = {PageObjectManager};