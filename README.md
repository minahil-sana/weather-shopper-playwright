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

- Import aliases are configured via `tsconfig.json` (`@main/*`, `@test-data/*`, `@data-models/*`).
- Snake_case naming is used for folders and files.
- POM is split by page into `locators`, `actions`, `assertions`, and `tasks` files.
- Spec file contains only test declaration and task invocation.
- Business flow orchestration is implemented in `main/flow_tasks/tc_001_shopping_flow_task.ts`.
- Payment data is externalized in `main/test_data/payment_data.json`.

## Project Structure

```text
Weather_shopper/
|- main/
|  |- home_page/
|  |  |- home_page_locators.ts
|  |  |- home_page_actions.ts
|  |  |- home_page_assertions.ts
|  |  |- home_page_tasks.ts
|  |- moisturizer_page/
|  |  |- moisturizer_page_locators.ts
|  |  |- moisturizer_page_actions.ts
|  |  |- moisturizer_page_assertions.ts
|  |  |- moisturizer_page_tasks.ts
|  |- sunscreen_page/
|  |  |- sunscreen_page_locators.ts
|  |  |- sunscreen_page_actions.ts
|  |  |- sunscreen_page_assertions.ts
|  |  |- sunscreen_page_tasks.ts
|  |- cart_page/
|  |  |- cart_page_locators.ts
|  |  |- cart_page_actions.ts
|  |  |- cart_page_assertions.ts
|  |  |- cart_page_tasks.ts
|  |- confirmation_page/
|  |  |- confirmation_page_locators.ts
|  |  |- confirmation_page_actions.ts
|  |  |- confirmation_page_assertions.ts
|  |  |- confirmation_page_tasks.ts
|  |- flow_tasks/
|  |  |- tc_001_shopping_flow_task.ts
|  |- data_models/
|  |  |- payment_data_model.ts
|  |- test_data/
|  |  |- payment_data.json
|- tests/
|  |- tc_001_complete_purchase_flow.spec.ts
|- playwright.config.ts
|- tsconfig.json
|- manual_test_case.md
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
npx playwright test tests/tc_001_complete_purchase_flow.spec.ts
```

Run by test title:

```bash
npx playwright test -g "TC_001"
```

Run on a specific browser (example: Firefox):

```bash
npx playwright test tests/tc_001_complete_purchase_flow.spec.ts --project firefox
```

Run in headed mode:

```bash
npx playwright test tests/tc_001_complete_purchase_flow.spec.ts --headed --project chromium
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
- Manual test documentation is available in `manual_test_case.md`.


