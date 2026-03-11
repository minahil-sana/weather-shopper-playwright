# Weather Shopper E2E Tests

Playwright end-to-end automation for the Weather Shopper demo site.

## Overview

Application URL: `http://weathershopper.pythonanywhere.com/`

Implemented automated scenario:
- `TC_001: Verify end-to-end shopping flow based on temperature`

Current flow:
1. Open home page and verify the page is loaded.
2. Read current temperature.
3. Decide which product category to shop:
- `< 19 C`: navigate to Moisturizers.
- `> 34 C`: navigate to Sunscreens.
- `19 C to 34 C`: log `no need to purchase anything` and return no selected products.
4. For shopping paths (`< 19` or `> 34`) Verify correct Product Page.
5. Verify cart is Empty.
6. Add two least expensive products by keyword:
- Moisturizers: `Aloe`, `Almond`
- Sunscreens: `SPF-50`, `SPF-30`
7. Verify cart button shows 2 items.
8. Open cart and verify cart page.
9. Verify cart items match selected products and total equals sum.
10. Complete Stripe checkout using test data.
11. Verify redirect to confirmation page and success message. 

## Stack

- Node.js
- TypeScript
- Playwright (`@playwright/test`)

## Framework Design

- Function-based page modules (no classes).
- Each page is split into:
- `*_locators.ts`
- `*_actions.ts`
- `*_assertions.ts`
- `*_tasks.ts`


## Import Aliases

Configured in `tsconfig.json`:
- `@main/*` -> `main/*`
- `@test-data/*` -> `main/test_data/*`

Current code primarily uses `@main/...` imports.

## Project Structure

```text
Weather_shopper/
|- main/
|  |- test_data/
|  |  |- payment_data.ts
|  |- ui/
|  |  |- home_page/
|  |  |  |- home_page_locators.ts
|  |  |  |- home_page_actions.ts
|  |  |  |- home_page_assertions.ts
|  |  |  |- home_page_tasks.ts
|  |  |- product_page/
|  |  |  |- product_page_locators.ts
|  |  |  |- product_page_actions.ts
|  |  |  |- product_page_assertions.ts
|  |  |  |- product_page_tasks.ts
|  |  |- cart_page/
|  |  |  |- cart_page_locators.ts
|  |  |  |- cart_page_actions.ts
|  |  |  |- cart_page_assertions.ts
|  |  |  |- cart_page_tasks.ts
|  |  |- confirmation_page/
|  |  |  |- confirmation_page_locators.ts
|  |  |  |- confirmation_page_actions.ts
|  |  |  |- confirmation_page_assertions.ts
|- tests/
|  |- tc_001_complete_purchase_flow.spec.ts
|- manual_test_case.md
|- playwright.config.ts
|- tsconfig.json
|- package.json
|- README.md
```

## Setup

Prerequisites:
- Node.js 18+
- npm

Install dependencies:

```bash
npm install
npx playwright install
```

## Run Tests

Run TC_001:

```bash
npx playwright test tests/tc_001_complete_purchase_flow.spec.ts
```

Run in headed Chromium:

```bash
npx playwright test tests/tc_001_complete_purchase_flow.spec.ts --project chromium --headed
```

Run by title:

```bash
npx playwright test -g "TC_001"
```

## Reports

Open the latest HTML report:

```bash
npx playwright show-report
```

Generated report path: `playwright-report/index.html`.

## Notes

- Browser projects and retries/workers are configured in `playwright.config.ts`.
- Manual test reference is available in `manual_test_case.md`.


