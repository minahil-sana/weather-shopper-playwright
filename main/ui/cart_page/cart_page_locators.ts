import { FrameLocator, Locator, Page } from '@playwright/test';

export interface CartPageLocators {
  productNames: Locator;
  productPrices: Locator;
  totalPrice: Locator;
  payWithCardButton: Locator;
  stripeIframe: FrameLocator;
  stripeEmailInput: Locator;
  stripeCardNumberInput: Locator;
  stripeExpiryInput: Locator;
  stripeCvcInput: Locator;
  stripeZipInput: Locator;
  stripeSubmitButton: Locator;
}

export function getCartPageLocators(page: Page): CartPageLocators {
  const stripeIframe = page.frameLocator('iframe[name="stripe_checkout_app"]');

  return {
    productNames: page.locator('table.table-striped tbody tr td:nth-child(1)'),
    productPrices: page.locator('table.table-striped tbody tr td:nth-child(2)'),
    totalPrice: page.locator('#total'),
    payWithCardButton: page.locator('button:has-text("Pay with Card")'),
    stripeIframe,
    stripeEmailInput: stripeIframe.locator('input[type="email"]'),
    stripeCardNumberInput: stripeIframe.locator('input[placeholder="Card number"]'),
    stripeExpiryInput: stripeIframe.locator('input[placeholder="MM / YY"]'),
    stripeCvcInput: stripeIframe.locator('input[placeholder="CVC"]'),
    stripeZipInput: stripeIframe.locator('input[placeholder="ZIP Code"]'),
    stripeSubmitButton: stripeIframe.locator('button[type="submit"]#submitButton'),
  };
}
