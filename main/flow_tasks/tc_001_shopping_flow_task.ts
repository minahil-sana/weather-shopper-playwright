import { Page } from '@playwright/test';
import payment_data from '@test-data/payment_data.json';
import { CartPageTasks } from '@main/cart_page/cart_page_tasks';
import { ConfirmationPageTasks } from '@main/confirmation_page/confirmation_page_tasks';
import { HomePageTasks } from '@main/home_page/home_page_tasks';
import { MoisturizerPageTasks } from '@main/moisturizer_page/moisturizer_page_tasks';
import { SunscreenPageTasks } from '@main/sunscreen_page/sunscreen_page_tasks';
import { PaymentData } from '@data-models/payment_data_model';

export async function run_tc_001_shopping_flow_task(page: Page): Promise<void> {
  const home_page_tasks = new HomePageTasks(page);
  const moisturizer_page_tasks = new MoisturizerPageTasks(page);
  const sunscreen_page_tasks = new SunscreenPageTasks(page);
  const cart_page_tasks = new CartPageTasks(page);
  const confirmation_page_tasks = new ConfirmationPageTasks(page);

  await home_page_tasks.open_home_page();
  const temperature = await home_page_tasks.get_current_temperature();

  if (temperature < 19) {
    await home_page_tasks.open_moisturizers_page();
    await moisturizer_page_tasks.add_required_moisturizers_to_cart();
    await moisturizer_page_tasks.open_cart();
  } else if (temperature > 34) {
    await home_page_tasks.open_sunscreens_page();
    await sunscreen_page_tasks.add_required_sunscreens_to_cart();
    await sunscreen_page_tasks.open_cart();
  } else {
    console.log(`Temperature ${temperature}C between 19 and 34. No shopping required.`);
    return;
  }

  await cart_page_tasks.validate_cart_summary();
  await cart_page_tasks.complete_checkout(payment_data as PaymentData);
  await confirmation_page_tasks.validate_checkout_outcome();
}
