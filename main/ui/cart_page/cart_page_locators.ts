import { FrameLocator, Locator, Page } from '@playwright/test';

export interface CartPageLocators {
  productNames: Locator;
  productPrices: Locator;
  totalPrice: Locator;
  payWithCardButton: Locator;
  stripeIframe: FrameLocator;
}

export function getCartPageLocators(page: Page): CartPageLocators {
  return {
    productNames: page.locator('table.table-striped tbody tr td:nth-child(1)'),
    productPrices: page.locator('table.table-striped tbody tr td:nth-child(2)'),
    totalPrice: page.locator('#total'),
    payWithCardButton: page.locator('button:has-text("Pay with Card")'),
    stripeIframe: page.frameLocator('iframe[name="stripe_checkout_app"]'),
  };
}
