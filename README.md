# Weather Shopper E2E Tests

Playwright end-to-end automation for the Weather Shopper demo site.

## Overview

Application URL: `http://weathershopper.pythonanywhere.com/`

Implemented automated scenario:
- `TC_001: Verify end-to-end shopping flow based on temperature`

Current flow:
1. Open home page and verify temperature is visible.
2. Read temperature.
3. Navigate to the relevant product page:
- `< 19 C`: Moisturizers.
- `> 34 C`: Sunscreens.
- `19 C to 34 C`: test is skipped (no shopping required).
4. Verify correct product page.
5. Verify cart is empty.
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
- Spec remains high-level and delegates behavior to page tasks.
- Naming conventions:
- snake_case for folders/files
- camelCase for variables/functions
- assertion functions prefixed with `verify...`

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
|  |  |- moisturizer_page/
|  |  |  |- moisturizer_page_locators.ts
|  |  |  |- moisturizer_page_actions.ts
|  |  |  |- moisturizer_page_assertions.ts
|  |  |  |- moisturizer_page_tasks.ts
|  |  |- sunscreen_page/
|  |  |  |- sunscreen_page_locators.ts
|  |  |  |- sunscreen_page_actions.ts
|  |  |  |- sunscreen_page_assertions.ts
|  |  |  |- sunscreen_page_tasks.ts
|  |  |- cart_page/
|  |  |  |- cart_page_locators.ts
|  |  |  |- cart_page_actions.ts
|  |  |  |- cart_page_assertions.ts
|  |  |  |- cart_page_tasks.ts
|  |  |- confirmation_page/
|  |  |  |- confirmation_page_locators.ts
|  |  |  |- confirmation_page_actions.ts
|  |  |  |- confirmation_page_assertions.ts
|  |  |  |- confirmation_page_tasks.ts
|- tests/
|  |- tc_001_complete_purchase_flow.spec.ts
|- manual_test_case.md
|- playwright.config.ts
|- tsconfig.json
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

HTML report is enabled in `playwright.config.ts`.

Open the latest report:

```bash
npx playwright show-report
```

Generated report path: `playwright-report/index.html`.

## Notes

- Default browser projects: `chromium`, `firefox`, `webkit`.
- CI behavior (retries/workers) is controlled in `playwright.config.ts`.
- Manual test document: `manual_test_case.md`.


