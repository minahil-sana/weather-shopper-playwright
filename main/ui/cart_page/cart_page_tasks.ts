import { Page } from '@playwright/test';
import { CartPageActions } from '@main/ui/cart_page/cart_page_actions';
import { CartPageAssertions } from '@main/ui/cart_page/cart_page_assertions';
import { CartPageLocators } from '@main/ui/cart_page/cart_page_locators';
import { PaymentData } from '@test-data/payment_data';

export class CartPageTasks {
  readonly actions: CartPageActions;
  readonly assertions: CartPageAssertions;

  constructor(page: Page) {
    const locators = new CartPageLocators(page);
    this.actions = new CartPageActions(locators);
    this.assertions = new CartPageAssertions(page);
  }

  async validateCartSummary(): Promise<void> {
    const productNames = await this.actions.getProductNames();
    const productPrices = await this.actions.getProductPrices();
    const totalPrice = await this.actions.getTotalPrice();

    await this.assertions.verifyCartHasTwoItems(productNames, productPrices);
    await this.assertions.verifyTotalMatchesSum(productPrices, totalPrice);
  }

  async completeCheckout(payment_data: PaymentData): Promise<void> {
    await this.actions.clickPayWithCard();
    await this.actions.completeStripePayment(payment_data);
    await this.assertions.verifyRedirectedToConfirmation();
  }
}
