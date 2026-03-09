import { Page } from '@playwright/test';
import * as sunscreenPageActions from '@main/ui/sunscreen_page/sunscreen_page_actions';
import * as sunscreenPageAssertions from '@main/ui/sunscreen_page/sunscreen_page_assertions';

export async function addRequiredSunscreensToCart(
  page: Page,
): Promise<sunscreenPageActions.SelectedProduct[]> {
  await sunscreenPageAssertions.verifySunscreenPageOpened(page);
  await sunscreenPageAssertions.verifySunscreenProductGridVisible(page);
  await sunscreenPageAssertions.verifySunscreenCartIsEmpty(page);

  const spf50Product = await sunscreenPageActions.addLeastExpensiveSunscreenContaining(page, 'SPF-50');
  await sunscreenPageAssertions.verifySunscreenCartIsNotEmpty(page);
  const spf30Product = await sunscreenPageActions.addLeastExpensiveSunscreenContaining(page, 'SPF-30');
  await sunscreenPageAssertions.verifySunscreenCartItemCount(page, 2);

  return [spf50Product, spf30Product];
}

export async function openSunscreenCart(page: Page): Promise<void> {
  await sunscreenPageActions.clickSunscreenCart(page);
}
