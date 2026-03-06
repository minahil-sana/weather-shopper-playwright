import { CartPageLocators } from '@main/cart_page/cart_page_locators';
import { PaymentData } from '@data-models/payment_data_model';

export class CartPageActions {
  readonly locators: CartPageLocators;

  constructor(locators: CartPageLocators) {
    this.locators = locators;
  }

  async get_product_names(): Promise<string[]> {
    return this.locators.product_names.allTextContents();
  }

  async get_product_prices(): Promise<number[]> {
    const prices_text = await this.locators.product_prices.allTextContents();
    return prices_text.map((value) => parseInt(value.replace(/\D/g, ''), 10));
  }

  async get_total_price(): Promise<number> {
    const text = await this.locators.total_price.textContent();
    if (!text) throw new Error('Total price not found');
    return parseFloat(text.replace(/[^0-9.]/g, ''));
  }

  async click_pay_with_card(): Promise<void> {
    await this.locators.pay_with_card_button.click();
  }

  async complete_stripe_payment(payment_data: PaymentData): Promise<void> {
    const frame = this.locators.stripe_iframe;

    await frame.locator('input[type="email"]').fill(payment_data.email);

    const card_number_field = frame.locator('input[placeholder="Card number"]');
    await card_number_field.click();
    await card_number_field.pressSequentially(payment_data.cardNumber, { delay: 100 });

    const expiry_field = frame.locator('input[placeholder="MM / YY"]');
    await expiry_field.waitFor({ state: 'visible', timeout: 15000 });
    await expiry_field.fill(payment_data.expiry);

    const cvc_field = frame.locator('input[placeholder="CVC"]');
    await cvc_field.waitFor({ state: 'visible', timeout: 15000 });
    await cvc_field.fill(payment_data.cvc);

    const zip_field = frame.locator('input[placeholder="ZIP Code"]');
    const zip_is_visible = await zip_field.isVisible();
    if (zip_is_visible) {
      await zip_field.fill(payment_data.zip);
    }

    await frame.locator('button[type="submit"]#submitButton').click();
  }
}
