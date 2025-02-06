# Circula Sign-Up Dropdown Automation Tests

### Project Overview

This project contains automated tests for the Circula sign-up page dropdown functionality using Playwright with TypeScript. The tests validate the addition of "Sweden" to the dropdown list and ensure proper selection, error handling, and navigation behavior.

### Setup & Installation

### Prerequisites

Node.js (>= 16)

npm or yarn

Playwright installed globally

## Installation Steps

### Clone this repository:

git clone https://github.com/sarmedmujaddid/CirculaAssignment.git

Navigate to the project directory:

cd CirculaAssignment

Install dependencies:

npm install

Install Playwright browsers:

npx playwright install

Running Tests

Execute all tests

npx playwright test

Run tests with UI mode

npx playwright test --ui

Run a specific test file

npx playwright test test/dropdown.spec.ts

Test Scenarios

The following test cases are implemented in test/dropdown.spec.ts:

Verify Sweden appears in the dropdown list

Open the sign-up page

Accept cookie consent

Navigate to the dropdown

Ensure "Sweden" is visible as an option

Select Sweden and verify selection

Open the dropdown

Select "Sweden"

Validate that the selected country is displayed correctly

Verify form submission with Sweden selected

Complete the sign-up form

Select "Sweden" in the country dropdown

Submit the form

Validate the success message appears

Verify error message when no country is selected

Attempt to submit the form without selecting a country

Ensure the error message "Company registration country is required" is displayed

Verify keyboard navigation with arrow keys

Open the dropdown

Navigate through the list using arrow keys

Ensure options change as expected

File Structure

test/dropdown.spec.ts → Test cases for the dropdown

pages/SignUpPage.ts → Page Object Model for sign-up page interactions

playwright.config.ts → Playwright configuration

Additional Notes

The test execution requires access to the Circula QA Challenge Environment

Ensure the website is accessible before running tests

Author: Sarmed MujaddidSubmission for: Circula QA Hiring Assignment 2025
