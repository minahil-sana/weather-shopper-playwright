import { Page } from '@playwright/test';
import * as cartPageActions from '@main/ui/cart_page/cart_page_actions';
import * as cartPageAssertions from '@main/ui/cart_page/cart_page_assertions';
import { PaymentData } from '@main/test_data/payment_data';

export async function validateCartSummary(
  page: Page,
  selectedProducts: cartPageAssertions.SelectedProductForCart[],
): Promise<void> {
  await cartPageAssertions.verifyCartPageOpened(page);

  const productNames = await cartPageActions.getCartProductNames(page);
  const productPrices = await cartPageActions.getCartProductPrices(page);
  const totalPrice = await cartPageActions.getCartTotalPrice(page);

  await cartPageAssertions.verifyCartHasTwoItems(productNames, productPrices);
  await cartPageAssertions.verifyCartProductsMatchSelected(productNames, productPrices, selectedProducts);
  await cartPageAssertions.verifyCartTotalMatchesSum(productPrices, totalPrice);
}

export async function completeCheckout(page: Page, paymentData: PaymentData): Promise<void> {
  await cartPageActions.clickPayWithCard(page);
  await cartPageActions.completeStripePayment(page, paymentData);
  await cartPageAssertions.verifyRedirectedToConfirmation(page);
}
