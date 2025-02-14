const { expect } = require("playwright/test");
const { TestConfig } = require('../../config/configProperties')

// pageObjects/LoginPage.js
class LoginPage {

    constructor(page) {
        this.page = page;
        this.emailInput = page.locator('input#email');
        this.passwordInput = page.locator('input#password');
        this.submitButton = page.locator('button:has-text("Sign In")');
        this.invalidLoginMessage= page.locator('span.errorMessage-module__errorMessage__sARgC');
    }

    async verifyLoginPage(){
        let country = TestConfig.country
        await expect(this.page).toHaveURL(`https://newstg.musto.com/${country}/sign-in`);
    }

    async goToLoginPage() {
        await this.page.goto('https://staging-shop.hhworkwear.com/');
    }

    async closeModal(){
        await this.page.locator('#emailSignupModal button.close').click();
    }

    async login() {
      /*  await this.submitButton.click();
        await this.emailInput.fill(username);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
        //await this.page.waitForTimeout(5000); */
        await this.page.waitForTimeout(10000);
        await expect(this.page.getByRole('textbox', { name: '*Email' })).toBeVisible();
  await this.page.getByRole('textbox', { name: '*Email' }).click();
  await this.page.getByRole('textbox', { name: '*Email' }).fill('roopsnov89@gmail.com');
  await this.page.getByRole('textbox', { name: '*Password' }).click();
  await this.page.getByRole('textbox', { name: '*Password' }).fill('Password@123');
  await this.page.getByRole('button', { name: 'Sign In' }).click();
    }

    async verifySuccessfulLogin(expectedUsername) {
        await this.page.waitForSelector('a[role="button"][id="myaccount"]');
        const userProfileName = await this.userProfileButton.textContent();
        return userProfileName.includes(expectedUsername);
    }

    async verifyInvalidLoginMessage(){
        const invalidMessage = await this.invalidLoginMessage.textContent();
        console.log('Invalid message showing:',invalidMessage)
        expect(this.invalidLoginMessage.toHaveText("The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later."))
    }
}

module.exports = { LoginPage };