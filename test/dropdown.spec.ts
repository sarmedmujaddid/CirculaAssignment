// playwright/tests/dropdownTest.spec.ts
import { test, expect } from '@playwright/test';
import { SignUpPage } from '../pages/SignUpPage';

// Test data
const countryName = 'Sweden';

// Test Suite
test.describe('Sign-up Dropdown Tests', () => {
    let signUpPage: SignUpPage;

    test.beforeEach(async ({ page }) => {
        signUpPage = new SignUpPage(page);
        await signUpPage.goto();
        await signUpPage.acceptConsent();
        await signUpPage.startSignUp();
        await signUpPage.acceptConsent();
        await signUpPage.signupPartOne('abc@dynamic.com', 'Password123');
        await signUpPage.signupPartTwo('John', 'Doe', '491234567890');
    });

    test('Verify Sweden appears in the dropdown list', async () => {
        await signUpPage.openDropdown();
        const countryOption = await signUpPage.getDropdownOption(countryName);
        await expect(countryOption).toBeVisible();
    });

    test('Verify form submission with Sweden selected', async () => {
        await signUpPage.signupPartThree('Circle');
        await signUpPage.selectCountry(countryName);
        await signUpPage.submitForm();
        await expect(signUpPage.successMessage).toBeVisible();

    });

    test('Verify keyboard navigation with arrow keys', async () => {
        await signUpPage.openDropdown();
        await signUpPage.navigateWithArrowKeys(11);
        await expect(signUpPage.dropdown).not.toBeEmpty();
    });
});
