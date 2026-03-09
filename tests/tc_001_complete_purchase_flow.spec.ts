import { test } from '@playwright/test';
import * as cartPageTasks from '@main/ui/cart_page/cart_page_tasks';
import * as confirmationPageTasks from '@main/ui/confirmation_page/confirmation_page_tasks';
import * as homePageTasks from '@main/ui/home_page/home_page_tasks';
import { paymentData } from '@main/test_data/payment_data';

test('TC_001: Verify end-to-end shopping flow based on temperature', async ({ page }) => {
  await homePageTasks.openHomePage(page);
  const temperature = await homePageTasks.getCurrentTemperature(page);
  const selectedProducts = await homePageTasks.handleTemperatureBasedProductFlow(page, temperature);

  await cartPageTasks.validateCartSummary(page, selectedProducts);
  await cartPageTasks.completeCheckout(page, paymentData);
  await confirmationPageTasks.validateCheckoutOutcome(page);
});
