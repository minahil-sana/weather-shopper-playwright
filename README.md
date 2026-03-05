# Weather Shopper E2E Tests

Playwright end-to-end automation for the Weather Shopper demo site using a Page Object Model (POM) structure.

## Overview

This project validates the moisturizer purchase flow on:
`http://weathershopper.pythonanywhere.com/`

Current implemented scenario:
- Read current temperature on home page
- If temperature is below 19 C, open moisturizers page
- Add the cheapest products containing `Aloe` and `Almond`
- Verify cart item count and total price
- Complete Stripe checkout using test card data
- Validate confirmation message

Automated test case title:
- `TC_001: Verify successful moisturizer purchase when temperature is below 19C`

## Tech Stack

- Node.js
- TypeScript
- Playwright (`@playwright/test`)

## Project Structure

```text
Weather_shopper/
|- pages/
|  |- homePage.ts
|  |- moisturiserPage.ts
|  |- cartPage.ts
|  |- confirmationPage.ts
|- tests/
|  |- tc-001-moisturizer-purchase.spec.ts
|- playwright.config.ts
|- manual-test-case.md
|- manual-testcase.md
|- README.md
```

## Prerequisites

- Node.js 18+
- npm

## Installation

```bash
npm install
npx playwright install
```

## Running Tests


Run the moisturizer flow test:

```bash
npx playwright test tests/tc-001-moisturizer-purchase.spec.ts
```

Run by test title:

```bash
npx playwright test -g "TC_001"
```

Run on a specific browser (example: Firefox):

```bash
npx playwright test tests/tc-001-moisturizer-purchase.spec.ts --project firefox
```

Run in headed mode:

```bash
npx playwright test tests/tc-001-moisturizer-purchase.spec.ts --headed --project chromium
```

## Reports

This project uses the HTML reporter (configured in `playwright.config.ts`).

After test execution, open the report with:

```bash
npx playwright show-report
```
It can also be viewed in the playwright-report folder named as `index.html`.
## Notes

- Browser projects enabled by default: `chromium`, `firefox`, `webkit`.
- Retry and worker behavior changes automatically on CI via `playwright.config.ts`.
- Detailed manual test documentation is available in `manual-testcase.md`.
