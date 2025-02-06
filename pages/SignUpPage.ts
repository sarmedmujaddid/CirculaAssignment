// playwright/pages/SignUpPage.ts
import { Page, Locator } from '@playwright/test';

export class SignUpPage {
    readonly page: Page;
    readonly consentAccept: Locator;
    readonly signUp: Locator;
    readonly workEmail: Locator;
    readonly passWord: Locator;
    readonly terms: Locator;
    readonly signInbutton: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly phoneNumber: Locator;
    readonly nextButton: Locator;
    readonly companyName: Locator;
    readonly dropdown: Locator;
    readonly listCount: Locator;
    readonly selectedCountryField: Locator
    readonly errorMessage: Locator;
    readonly successMessage: Locator;
    readonly howDidDrop: Locator;
    readonly howDidYouHearDropdown: Locator;
    readonly submitButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.consentAccept = page.getByTestId('uc-accept-all-button');
        this.signUp = page.getByRole('link', { name: 'Start a free trial' });
        this.workEmail = page.getByRole('textbox', { name: 'Work email' });
        this.passWord = page.getByRole('textbox', { name: 'Password Show password' });
        this.terms = page.locator('input[name="acceptTos"]'); // - working
        this.signInbutton = page.getByRole('button').filter({ hasText: 'Try for free' });
        this.firstName = page.getByRole('textbox', { name: 'First name' });   
        this.lastName = page.getByRole('textbox', { name: 'Last name' });
        this.phoneNumber = page.locator('input[name="phoneNumber"]');
        this.nextButton = page.getByRole('button', { name: 'Next step' });  
        this.companyName = page.locator('input[name="organizationName"]');
        this.dropdown = page.locator("//input[@name = 'country']"); 
        this.listCount = page.locator("//li[@role='option']"); 
        this.selectedCountryField = page.locator('input[name="country"]');
        this.errorMessage = page.locator('div[role="alert"]').filter({ hasText: 'Company registration country' });
        this.successMessage = page.locator('div').filter({ hasText: 'Great! Now please verify your email' });
        this.howDidDrop = page.locator('.sc-eb60ccfc-0.sc-6cdcdb5d-3.debbEH.dGIfiy').locator('svg').nth(1);
        this.howDidYouHearDropdown = page.locator("//div[@role='menuitemradio']");
        this.submitButton = page.getByRole('submit', {name:'Create an account'});

    }

    async goto() {
        await this.page.goto('/users/sign_in');
    }

    async acceptConsent() {
        await this.consentAccept.click();
    }

    async startSignUp() {
        await this.signUp.click();
    }

    async signupPartOne(email: string, password: string) {
        await this.workEmail.fill(email);
        await this.passWord.fill(password);
        await this.terms.click({ force: true });
        await this.signInbutton.click();
    }

    async signupPartTwo(firstname: string, lastname: string, phonenumber: string) {
        await this.firstName.fill(firstname);
        await this.lastName.fill(lastname);
        await this.phoneNumber.fill(phonenumber);
        await this.nextButton.click();
    }

    async signupPartThree(company: string) {
        await this.companyName.fill(company);
        await this.howDidDrop.click({ force: true });
        await this.howDidYouHearDropdown.nth(0).click();
    }

    async acceptTerms() {
        await this.terms.click();
    }

    async openDropdown() {
        await this.dropdown.waitFor({ state: 'attached' });
        await this.dropdown.waitFor({ state: 'visible' });
        await this.dropdown.click({ force: true }); // Force click to bypass overlays
        //await this.page.waitForSelector("//li[@role='option']", { state: 'visible' });
    }

    async openDropdownInvalid() {
        await this.dropdown.click({ force: true });
        await this.searchCountry('');
    }

    async selectCountry(country: string) {

        await this.openDropdown();
        // Get the list of country options
        const countryList = await this.page.locator("//li[@role='option']");
        const listCount = await countryList.count(); // Get the number of options

        // Iterate through the options to find the correct country
        for (let i = 0; i <= listCount; i++) {
            const countryOption = countryList.nth(i);
            const countryText = await countryOption.innerText(); // Get the text of the country option

            // Check if the text matches the country you're looking for
            if (countryText === country) {
                await countryOption.click({ force: true , await : '5000' });  // Click the matching country option
                //break;  // Exit the loop once the country is found
            }
            break;  // Exit the loop once the country is found

        }
    }

    async searchCountry(country: string) {
        await this.openDropdown();  // Open the dropdown
        await this.selectedCountryField.fill(country);  // Type the country name
        await this.selectedCountryField.press('Enter'); // Press Enter to select
        await this.page.waitForTimeout(500);  // Wait for selection
    }

    async getDropdownOption(country: string) {
        const optionLocator = this.page.locator(`li[role="option"]:has-text("${country}")`);
        await optionLocator.waitFor({ state: 'attached' });
        await optionLocator.waitFor({ state: 'visible' });
        return optionLocator;

    }

    async getSelectedCountry() {
        return this.dropdown.inputValue();
    }

    async submitForm() {
        await this.submitButton.click();
    }

    async navigateWithArrowKeys(times: number) {
        for (let i = 0; i < times; i++) {
            await this.page.keyboard.press('ArrowDown');
        }
        await this.page.keyboard.press('Enter');
    }
}
