import { Locator, Page } from '@playwright/test';

export class SunscreenPageLocators {
  readonly product_blocks: Locator;
  readonly cart_button: Locator;
  readonly cart_status_span: Locator;

  constructor(page: Page) {
    this.product_blocks = page.locator('div.text-center.col-4');
    this.cart_button = page.locator('button:has-text("Cart")');
    this.cart_status_span = page.locator('button:has-text("Cart") >> span');
  }
}
