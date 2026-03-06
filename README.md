# Weather Shopper E2E Tests

Playwright end-to-end automation for the Weather Shopper demo site using a Page Object Model (POM) architecture.

## Overview

Test URL: `http://weathershopper.pythonanywhere.com/`

Current implemented flow (`TC_001`):
- Read the current temperature on the home page.
- If temperature is below 19 C: buy moisturizers (least expensive `Aloe` and `Almond`).
- If temperature is above 34 C: buy sunscreens (least expensive `SPF-50` and `SPF-30`).
- If temperature is between 19 and 34 C: no purchase path is executed and flow exits.
- Validate cart count and cart total.
- Complete payment using Stripe test data from JSON.
- Validate confirmation message.

Automated test title:
- `TC_001: Verify end-to-end shopping flow based on temperature`

## Tech Stack

- Node.js
- TypeScript
- Playwright (`@playwright/test`)

## Framework Highlights

- Import aliases are configured via `tsconfig.json` (`@main/*`, `@test-data/*`).
- Spec file contains only test declaration and function call.
- Business flow is implemented in reusable main-layer function.
- Product selection logic is shared through `BaseProductPage` inheritance.
- Payment data is externalized in `test_data/payment-data.json`.

## Project Structure

```text
Weather_shopper/
|- main/
|  |- baseProductPage.ts
|  |- homePage.ts
|  |- moisturiserPage.ts
|  |- sunscreenPage.ts
|  |- cartPage.ts
|  |- confirmationPage.ts
|  |- tc001ShoppingFlow.ts
|- tests/
|  |- tc-001-complete-purchase-flow.spec.ts
|- test_data/
|  |- payment-data.json
|- playwright.config.ts
|- tsconfig.json
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

Run the complete purchase flow test:

```bash
npx playwright test tests/tc-001-complete-purchase-flow.spec.ts
```

Run by test title:

```bash
npx playwright test -g "TC_001"
```

Run on a specific browser (example: Firefox):

```bash
npx playwright test tests/tc-001-complete-purchase-flow.spec.ts --project firefox
```

Run in headed mode:

```bash
npx playwright test tests/tc-001-complete-purchase-flow.spec.ts --headed --project chromium
```

## Reports

HTML reporter is configured in `playwright.config.ts`.

Open the report:

```bash
npx playwright show-report
```

Report file is also available at `playwright-report/index.html`.

## Notes

- Browser projects enabled by default: `chromium`, `firefox`, `webkit`.
- Retry and worker behavior automatically adjust on CI via `playwright.config.ts`.
- Manual test documentation is available in `manual-testcase.md`.


