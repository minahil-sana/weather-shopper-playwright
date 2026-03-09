import { Locator, Page } from '@playwright/test';

export interface MoisturizerPageLocators {
  productBlocks: Locator;
  cartButton: Locator;
  cartStatusSpan: Locator;
}

export function getMoisturizerPageLocators(page: Page): MoisturizerPageLocators {
  return {
    productBlocks: page.locator('div.text-center.col-4'),
    cartButton: page.locator('button:has-text("Cart")'),
    cartStatusSpan: page.locator('button:has-text("Cart") >> span'),
  };
}
