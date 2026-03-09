import { Locator, Page } from '@playwright/test';

export interface SunscreenPageLocators {
  productBlocks: Locator;
  cartButton: Locator;
  cartStatusSpan: Locator;
}

export function getSunscreenPageLocators(page: Page): SunscreenPageLocators {
  return {
    productBlocks: page.locator('div.text-center.col-4'),
    cartButton: page.locator('button:has-text("Cart")'),
    cartStatusSpan: page.locator('button:has-text("Cart") >> span'),
  };
}
