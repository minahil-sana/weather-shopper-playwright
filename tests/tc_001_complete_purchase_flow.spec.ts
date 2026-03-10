import { test } from '@playwright/test';
import * as cartPage from '@main/ui/cart_page/cart_page_assertions';
import * as cartPageTasks from '@main/ui/cart_page/cart_page_tasks';
import * as confirmationPage from '@main/ui/confirmation_page/confirmation_page_assertions';
import * as homePageTasks from '@main/ui/home_page/home_page_tasks';
import { paymentData } from '@main/test_data/payment_data';

test('TC_001: Verify end-to-end shopping flow based on temperature', async ({ page }) => {
  await homePageTasks.openHomePage(page);
  const temperature = await homePageTasks.getCurrentTemperature(page);
  const selectedProducts = await homePageTasks.handleTemperatureBasedProductFlow(page, temperature);

  await cartPage.validateCartSummary(page, selectedProducts);
  await cartPageTasks.completeCheckout(page, paymentData);
  await confirmationPage.validateCheckoutOutcome(page);
});
