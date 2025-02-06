# Circula Sign-Up Dropdown Automation Tests

### Project Overview

This project contains automated tests for the Circula sign-up page dropdown functionality using Playwright with TypeScript. The tests validate the addition of "Sweden" to the dropdown list and ensure proper selection, error handling, and navigation behavior.

### Setup & Installation

#### Prerequisites

- Node.js (>= 16)

- npm or yarn

- Playwright installed globally

## Installation Steps

1. Clone this repository:

```bash
git clone https://github.com/sarmedmujaddid/CirculaAssignment.git
```

2. Navigate to the project directory:

```
cd CirculaAssignment
```

3. Install dependencies:

```
npm install
```

4. Install Playwright browsers:

```
npx playwright install
```

### Running Tests

#### Execute all tests

```
npx playwright test
```

#### Run tests with UI mode

```
npx playwright test --ui
```

#### Run a specific test file
```
npx playwright test test/dropdown.spec.ts
```

### Test Scenarios

The following test cases are implemented in test/dropdown.spec.ts:

#### Verify Sweden appears in the dropdown list

Open the sign-up page

Accept cookie consent

Navigate to the dropdown

Ensure "Sweden" is visible as an option



#### Verify form submission with Sweden selected

Complete the sign-up form

Select "Sweden" in the country dropdown

Submit the form

Validate the success message appears


#### Verify keyboard navigation with arrow keys

Open the dropdown

Navigate through the list using the arrow keys

Ensure options change as expected

### File Structure
```bash

playwright-project/
│-- tests/              # Contains test specs
│   ├── dropdownTest.spec.ts
│-- pages/              # Page Object Model (POM) classes
│   ├── SignUpPage.ts
│-- playwright.config.ts # Configuration file
│-- package.json        # Dependencies and scripts
│-- tsconfig.json       # TypeScript config (if using TypeScript)

```

Author: Sarmed Ali Submission for: Circula QA Hiring Assignment 2025
