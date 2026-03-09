import { FrameLocator, Locator, Page } from '@playwright/test';

export class CartPageLocators {
  readonly productNames: Locator;
  readonly productPrices: Locator;
  readonly totalPrice: Locator;
  readonly payWithCardButton: Locator;
  readonly stripeIframe: FrameLocator;

  constructor(page: Page) {
    this.productNames = page.locator('table.table-striped tbody tr td:nth-child(1)');
    this.productPrices = page.locator('table.table-striped tbody tr td:nth-child(2)');
    this.totalPrice = page.locator('#total');
    this.payWithCardButton = page.locator('button:has-text("Pay with Card")');
    this.stripeIframe = page.frameLocator('iframe[name="stripe_checkout_app"]');
  }
}
