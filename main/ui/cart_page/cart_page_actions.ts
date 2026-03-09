import { CartPageLocators } from '@main/ui/cart_page/cart_page_locators';
import { PaymentData } from '@test-data/payment_data';

export class CartPageActions {
  readonly locators: CartPageLocators;

  constructor(locators: CartPageLocators) {
    this.locators = locators;
  }

  async getProductNames(): Promise<string[]> {
    return this.locators.productNames.allTextContents();
  }

  async getProductPrices(): Promise<number[]> {
    const pricesText = await this.locators.productPrices.allTextContents();
    return pricesText.map((value) => parseInt(value.replace(/\D/g, ''), 10));
  }

  async getTotalPrice(): Promise<number> {
    const text = await this.locators.totalPrice.textContent();
    if (!text) throw new Error('Total price not found');
    return parseFloat(text.replace(/[^0-9.]/g, ''));
  }

  async clickPayWithCard(): Promise<void> {
    await this.locators.payWithCardButton.click();
  }

  async completeStripePayment(paymentData: PaymentData): Promise<void> {
    const frame = this.locators.stripeIframe;

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
}
