import { Page } from '@playwright/test';
import { CartPageActions } from '@main/cart_page/cart_page_actions';
import { CartPageAssertions } from '@main/cart_page/cart_page_assertions';
import { CartPageLocators } from '@main/cart_page/cart_page_locators';
import { PaymentData } from '@data-models/payment_data_model';

export class CartPageTasks {
  readonly actions: CartPageActions;
  readonly assertions: CartPageAssertions;

  constructor(page: Page) {
    const locators = new CartPageLocators(page);
    this.actions = new CartPageActions(locators);
    this.assertions = new CartPageAssertions(page);
  }

  async validate_cart_summary(): Promise<void> {
    const product_names = await this.actions.get_product_names();
    const product_prices = await this.actions.get_product_prices();
    const total_price = await this.actions.get_total_price();

    await this.assertions.assert_cart_has_two_items(product_names, product_prices);
    await this.assertions.assert_total_matches_sum(product_prices, total_price);
  }

  async complete_checkout(payment_data: PaymentData): Promise<void> {
    await this.actions.click_pay_with_card();
    await this.actions.complete_stripe_payment(payment_data);
    await this.assertions.assert_redirected_to_confirmation();
  }
}
