import { FrameLocator, Locator, Page } from '@playwright/test';

export class CartPageLocators {
  readonly product_names: Locator;
  readonly product_prices: Locator;
  readonly total_price: Locator;
  readonly pay_with_card_button: Locator;
  readonly stripe_iframe: FrameLocator;

  constructor(page: Page) {
    this.product_names = page.locator('table.table-striped tbody tr td:nth-child(1)');
    this.product_prices = page.locator('table.table-striped tbody tr td:nth-child(2)');
    this.total_price = page.locator('#total');
    this.pay_with_card_button = page.locator('button:has-text("Pay with Card")');
    this.stripe_iframe = page.frameLocator('iframe[name="stripe_checkout_app"]');
  }
}
