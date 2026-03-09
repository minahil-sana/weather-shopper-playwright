import { Locator, Page } from '@playwright/test';

export class SunscreenPageLocators {
  readonly productBlocks: Locator;
  readonly cartButton: Locator;
  readonly cartStatusSpan: Locator;

  constructor(page: Page) {
    this.productBlocks = page.locator('div.text-center.col-4');
    this.cartButton = page.locator('button:has-text("Cart")');
    this.cartStatusSpan = page.locator('button:has-text("Cart") >> span');
  }
}
