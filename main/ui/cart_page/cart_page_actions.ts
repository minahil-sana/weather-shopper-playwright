import { Page } from '@playwright/test';
import { getCartPageLocators } from '@main/ui/cart_page/cart_page_locators';
import { PaymentData } from '@main/test_data/payment_data';

export async function getCartProductNames(page: Page): Promise<string[]> {
  const locators = getCartPageLocators(page);
  return locators.productNames.allTextContents();
}

export async function getCartProductPrices(page: Page): Promise<number[]> {
  const locators = getCartPageLocators(page);
  const pricesText = await locators.productPrices.allTextContents();
  return pricesText.map((value) => parseInt(value.replace(/\D/g, ''), 10));
}

export async function getCartTotalPrice(page: Page): Promise<number> {
  const locators = getCartPageLocators(page);
  const text = await locators.totalPrice.textContent();
  if (!text) throw new Error('Total price not found');
  return parseFloat(text.replace(/[^0-9.]/g, ''));
}

export async function clickPayWithCard(page: Page): Promise<void> {
  const locators = getCartPageLocators(page);
  await locators.payWithCardButton.click();
}

export async function completeStripePayment(page: Page, paymentData: PaymentData): Promise<void> {
  const locators = getCartPageLocators(page);
  const frame = locators.stripeIframe;

  await frame.locator('input[type="email"]').fill(paymentData.email);

  const cardNumberField = frame.locator('input[placeholder="Card number"]');
  await cardNumberField.click();
  await cardNumberField.pressSequentially(paymentData.cardNumber, { delay: 100 });

  const expiryField = frame.locator('input[placeholder="MM / YY"]');
  await expiryField.waitFor({ state: 'visible', timeout: 15000 });
  await expiryField.fill(paymentData.expiry);

  const cvcField = frame.locator('input[placeholder="CVC"]');
  await cvcField.waitFor({ state: 'visible', timeout: 15000 });
  await cvcField.fill(paymentData.cvc);

  const zipField = frame.locator('input[placeholder="ZIP Code"]');
  const zipIsVisible = await zipField.isVisible();
  if (zipIsVisible) {
    await zipField.fill(paymentData.zip);
  }

  await frame.locator('button[type="submit"]#submitButton').click();
}
