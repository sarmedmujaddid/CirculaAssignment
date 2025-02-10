// playwright/pages/SignUpPage.ts
import { Page, Locator } from '@playwright/test';

export class SignUpPage {
    readonly page: Page;
    readonly acceptAllConsentButton: Locator;
    readonly startFreeTrialLink: Locator;
    readonly workEmailField: Locator;
    readonly passwordField: Locator;
    readonly termsCheckbox: Locator;
    readonly tryForFreeButton: Locator;
    readonly firstNameField: Locator;
    readonly lastNameField: Locator;
    readonly phoneNumberField: Locator;
    readonly nextStepButton: Locator;
    readonly companyNameField: Locator;
    readonly countryField: Locator;
    readonly countryOptionList: Locator;
    readonly errorMessageCountryRequired: Locator;
    readonly errorMessageNoCountryFound: Locator;
    readonly successMessageEmailSent: Locator;
    readonly howDidYouHearField: Locator;
    readonly howDidYouHearOptions: Locator;
    readonly completeSignUpButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.acceptAllConsentButton = page.getByTestId('uc-accept-all-button');
        this.startFreeTrialLink = page.getByRole('link', { name: 'Start a free trial' });
        this.workEmailField = page.getByRole('textbox', { name: 'Work email' });
        this.passwordField = page.locator('input[name="password"]');
        this.termsCheckbox = page.locator('input[name="acceptTos"]');
        this.tryForFreeButton = page.getByRole('button', { name: 'Try for free' }); 

        this.firstNameField = page.getByRole('textbox', { name: 'First name' });
        this.lastNameField = page.getByRole('textbox', { name: 'Last name' });
        this.phoneNumberField = page.locator('input[name="phoneNumber"]');
        this.nextStepButton = page.getByRole('button', { name: 'Next step' });

        this.companyNameField = page.locator('input[name="organizationName"]');
        this.countryField = page.locator('//input[@id="downshift-:r4:-input"]'); 
        this.countryOptionList = page.locator("//li[@role='option']");

        this.errorMessageCountryRequired = page.locator('div[role="alert"]', { hasText: "Company registration country is required" });
        this.errorMessageNoCountryFound = page.locator('//div[text()="Can’t find your country?"]'); 
        this.successMessageEmailSent = page.locator('div[role="alert"]:has-text("verify your email")');

        this.howDidYouHearField = page.locator('input[value="Choose channel"]');
        this.howDidYouHearOptions = page.locator('//div[@role="menuitemradio"]'); 
        this.completeSignUpButton = page.getByRole('button', { name: /Create an account/i });
    }

    async goto() {
        await this.page.goto('/users/sign_in');
    }

    async clickAcceptAllConsentButton() {
        await this.acceptAllConsentButton.click();
    }

    async clickTermsCheckbox() {
        await this.termsCheckbox.click();
    }

    async clickStartFreeTrialLink() {
        await this.startFreeTrialLink.click();
    }

    async completeSignUp() {
        await this.completeSignUpButton.click();
    }

    async fillCountryField(country: string) {
        await this.countryField.fill(country);
    }

    async fillSignUpFormPartOne(email: string, password: string) {
        await this.workEmailField.fill(email);
        await this.passwordField.fill(password);
        await this.termsCheckbox.click({ force: true });
        await this.tryForFreeButton.click();
    }

    async fillSignUpFormPartTwo(firstname: string, lastname: string, phonenumber: string, company: string) {
        await this.firstNameField.fill(firstname);
        await this.lastNameField.fill(lastname);
        await this.phoneNumberField.fill(phonenumber);
        await this.nextStepButton.click();
        await this.companyNameField.fill(company);
    }

    async openCountryDropdown() {
        await this.countryField.waitFor({ state: 'visible', timeout: 5000 }); 
        await this.countryField.click({ force: true });

        await this.page.waitForSelector("li[role='option']", { state: 'visible' });
    }

    // Retrieve the current value from the country field
    async getCountryFieldValue(): Promise<string> {
        
        // Ensure the countryField field is available
        await this.countryField.waitFor({ state: 'visible', timeout: 5000 });

         // Retrieve the current value from the input field
         const selectedCountry = await this.countryField.inputValue();

         //console.log(`✅ Retrieved selected country: ${selectedCountry}`);
          return selectedCountry;
    }

    async getCountryOptionCount(): Promise<number> {
        await this.countryField.click();
        await this.countryOptionList.first().waitFor({ state: 'visible', });
        const count = await this.countryOptionList.count();

        //console.log(`📌 Total countryField options: ${count}`);
        return count;

    }

    async isCountryListed(country: string): Promise<boolean> {
        const count = await this.countryOptionList.count();
        for (let i = 0; i < count; i++) {
            const option = await this.countryOptionList.nth(i);

            await option.waitFor({ state: 'attached', timeout: 3000 });

            const text = await option.textContent();
            //console.log(`🔹 Option ${i}: ${text.trim()}`);

            if (text?.trim() === country) {
                //console.log(`✅ Country "${country}" found in countryField!`);
                return true;
            }
        }
        console.log(`❌ Country "${country}" NOT found in the countryField.`);
        return false;
    }

    async resetCountryField() {
        await this.countryField.click({ force: true });

        for (let i = 0; i < 10; i++) {
            await this.page.keyboard.press('Backspace');
        }
        await this.page.keyboard.press('Enter');
        await this.page.keyboard.press('Tab');
    }

    async selectCountryOption(country: string) {
        //console.log(`🔄 Opening the countryField...`);
        await this.countryField.click({ force: true });

        //console.log(`🔄 Waiting for options to be visible...`);
        await this.page.waitForSelector("li[role='option']", { state: 'visible', timeout: 5000 });

        const countryOption = await this.countryField.fill(country);
        await this.page.keyboard.press('Enter');

         // Move focus to the next field
         await this.page.keyboard.press('Tab');
    }

    async selectHowDidYouHearOption(hear: string) {
        await this.page.mouse.move(0, 0); // Move mouse away
        await this.howDidYouHearField.click({ force: true });

        const option = this.page.locator(`//div[@role="menuitemradio" and @data-valuetext="${hear}"]`);

        //await option.waitFor({ state: 'visible', timeout: 5000 });

        // Click to select the option
        await option.click({ force: true });
    }


    async navigateDropdownWithArrowKeys(times: number) {
        for (let i = 0; i < times; i++) {
            await this.page.keyboard.press('ArrowDown');
        }
        await this.page.keyboard.press('Enter');
    }
}
