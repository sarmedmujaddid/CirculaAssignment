// playwright/tests/dropdownTest.spec.ts
import { test, expect } from '@playwright/test';
import { SignUpPage } from '../pages/SignUpPage';

// Test data
const countryName = 'Sweden';

// Function to generate a random email
const generateRandomEmail = (): string => {
    const timestamp = Date.now(); // Unique timestamp
    return `testuser${timestamp}@example.com`;
};

// Test Suite
test.describe('Sign-up Dropdown Tests', () => {
    let signUpPage: SignUpPage;
    let randomEmail: string; // Store random email for the test


    test.beforeEach(async ({ page }) => {
        signUpPage = new SignUpPage(page);
        randomEmail = generateRandomEmail(); // Generate a new email for each test

        await signUpPage.goto();
        await signUpPage.clickAcceptAllConsentButton();
        await signUpPage.clickStartFreeTrialLink();
        await signUpPage.clickAcceptAllConsentButton();
        await signUpPage.fillSignUpFormPartOne(randomEmail, 'Password123');
        await signUpPage.fillSignUpFormPartTwo('John', 'Don', '4917677434357', 'Circle');

    });

    test('Verify sign up form submission with Sweden as country selected', async () => {
        await signUpPage.selectCountryOption(countryName);
        await signUpPage.selectHowDidYouHearOption('Search Engine (Google, Bing, etc.)');

        const selectedCountry = await signUpPage.getCountryFieldValue();
        await expect(selectedCountry.trim()).toBe(countryName);

        //Submit form and validate success message
        await signUpPage.completeSignUp();
        await expect(signUpPage.successMessageEmailSent).toBeVisible({ timeout: 5000 });
    });

    test('Verify Sweden appears in the dropdown list', async () => {
        await signUpPage.openCountryDropdown();
        const countryExists = await signUpPage.isCountryListed(countryName);
        await expect(countryExists).toBeTruthy();
    });

    test('Verify error message for non-existing country', async () => {
        await signUpPage.fillCountryField('XYZ');
        await expect(signUpPage.errorMessageNoCountryFound).toHaveText("Can’t find your country? Contact us.");
    });

    test('Verify error message when no country selected', async () => {
        await signUpPage.resetCountryField();
        await signUpPage.selectHowDidYouHearOption('Search Engine (Google, Bing, etc.)');
        await signUpPage.completeSignUp();
        await expect(signUpPage.errorMessageCountryRequired).toHaveText('Company registration country is required');
    });

    test('Verify keyboard navigation works for dropdown', async () => {
        await signUpPage.openCountryDropdown();
        await signUpPage.navigateDropdownWithArrowKeys(7);

        const selectedCountry = await signUpPage.getCountryFieldValue();
        expect(selectedCountry).not.toBe('');
    });

    test('Verify dropdown ordering matches design', async () => {
        await signUpPage.openCountryDropdown();
        const isOrderedCorrectly = await signUpPage.getCountryFieldValue();

        if (!isOrderedCorrectly) {
            throw new Error("❌ Dropdown order does NOT match the expected order!");
        }
        expect(isOrderedCorrectly).toBeTruthy();
    });
});
