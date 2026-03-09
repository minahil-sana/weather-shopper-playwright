import { Page } from '@playwright/test';
import { payment_data } from '@test-data/payment_data';
import { CartPageTasks } from '@main/ui/cart_page/cart_page_tasks';
import { ConfirmationPageTasks } from '@main/ui/confirmation_page/confirmation_page_tasks';
import { HomePageTasks } from '@main/ui/home_page/home_page_tasks';
import { MoisturizerPageTasks } from '@main/ui/moisturizer_page/moisturizer_page_tasks';
import { SunscreenPageTasks } from '@main/ui/sunscreen_page/sunscreen_page_tasks';

export async function run_tc_001_shopping_flow_task(page: Page): Promise<void> {
  const home_page_tasks = new HomePageTasks(page);
  const moisturizer_page_tasks = new MoisturizerPageTasks(page);
  const sunscreen_page_tasks = new SunscreenPageTasks(page);
  const cart_page_tasks = new CartPageTasks(page);
  const confirmation_page_tasks = new ConfirmationPageTasks(page);

  await home_page_tasks.openHomePage();
  const temperature = await home_page_tasks.getCurrentTemperature();

  if (temperature < 19) {
    await home_page_tasks.openMoisturizersPage();
    await moisturizer_page_tasks.addRequiredMoisturizersToCart();
    await moisturizer_page_tasks.openCart();
  } else if (temperature > 34) {
    await home_page_tasks.openSunscreensPage();
    await sunscreen_page_tasks.addRequiredSunscreensToCart();
    await sunscreen_page_tasks.openCart();
  } else {
    console.log(`Temperature ${temperature}C between 19 and 34. No shopping required.`);
    return;
  }

  await cart_page_tasks.validateCartSummary();
  await cart_page_tasks.completeCheckout(payment_data);
  await confirmation_page_tasks.validateCheckoutOutcome();
}
