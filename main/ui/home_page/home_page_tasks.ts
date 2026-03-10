import { Page, test } from '@playwright/test';
import * as homePageActions from '@main/ui/home_page/home_page_actions';
import * as homePageAssertions from '@main/ui/home_page/home_page_assertions';
import * as productPageActions from '@main/ui/product_page/product_page_actions';
import * as productPageTasks from '@main/ui/product_page/product_page_tasks';

export type ShoppingDecision = 'moisturizer' | 'sunscreen' | 'none';

export async function openHomePage(page: Page): Promise<void> {
  await homePageActions.navigateToHomePage(page);
  await homePageAssertions.verifyHomePageLoaded(page);
}

export async function getCurrentTemperature(page: Page): Promise<number> {
  return homePageActions.getTemperatureValue(page);
}

export async function navigateToProductPageForTemperature(
  page: Page,
  temperature: number,
): Promise<ShoppingDecision> {
  if (temperature < 19) {
    await homePageActions.clickBuyMoisturizers(page);
    return 'moisturizer';
  }

  if (temperature > 34) {
    await homePageActions.clickBuySunscreens(page);
    return 'sunscreen';
  }

  return 'none';
}

export async function handleTemperatureBasedProductFlow(
  page: Page,
  temperature: number,
): Promise<Array<{ name: string; price: number }>> {
  const decision = await navigateToProductPageForTemperature(page, temperature);

  if (decision === 'moisturizer') {
    const selectedProducts = await productPageTasks.addRequiredMoisturizersToCart(page);
    await productPageActions.openProductCart(page);
    return selectedProducts;
  }

  if (decision === 'sunscreen') {
    const selectedProducts = await productPageTasks.addRequiredSunscreensToCart(page);
    await productPageActions.openProductCart(page);
    return selectedProducts;
  }

  test.skip(true, `Temperature ${temperature}C is between 19 and 34; no shopping required.`);
  return [];
}
