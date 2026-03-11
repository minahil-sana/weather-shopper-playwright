import { Page } from '@playwright/test';
import * as cartPageActions from '@main/ui/cart_page/cart_page_actions';
import * as cartPageAssertions from '@main/ui/cart_page/cart_page_assertions';
import { PaymentData } from '@main/test_data/payment_data';
import { getCartPageLocators } from '@main/ui/cart_page/cart_page_locators';


export async function completeCheckout(page: Page, paymentData: PaymentData): Promise<void> {
  await cartPageActions.clickPayWithCard(page);
  await completeStripePayment(page, paymentData);
  await cartPageAssertions.verifyRedirectedToConfirmation(page);
}

export async function completeStripePayment(page: Page, paymentData: PaymentData): Promise<void> {
  const locators = getCartPageLocators(page);
  await locators.stripeEmailInput.fill(paymentData.email);

  const cardNumberField = locators.stripeCardNumberInput;
  await cardNumberField.click();
  await page.waitForTimeout(300);
  await cardNumberField.pressSequentially(paymentData.cardNumber, { delay: 100 });

  const expiryField = locators.stripeExpiryInput;
  await expiryField.waitFor({ state: 'visible', timeout: 15000 });
  await expiryField.fill(paymentData.expiry);

  const cvcField = locators.stripeCvcInput;
  await cvcField.waitFor({ state: 'visible', timeout: 15000 });
  await cvcField.fill(paymentData.cvc);

  const zipField = locators.stripeZipInput;
  const zipIsVisible = await zipField.isVisible();
  if (zipIsVisible) {
    await zipField.fill(paymentData.zip);
  }

  await locators.stripeSubmitButton.click();
}
