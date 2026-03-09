import { Page } from '@playwright/test';
import * as moisturizerPageActions from '@main/ui/moisturizer_page/moisturizer_page_actions';
import * as moisturizerPageAssertions from '@main/ui/moisturizer_page/moisturizer_page_assertions';

export async function addRequiredMoisturizersToCart(
  page: Page,
): Promise<moisturizerPageActions.SelectedProduct[]> {
  await moisturizerPageAssertions.verifyMoisturizerPageOpened(page);
  await moisturizerPageAssertions.verifyMoisturizerProductGridVisible(page);
  await moisturizerPageAssertions.verifyMoisturizerCartIsEmpty(page);

  const aloeProduct = await moisturizerPageActions.addLeastExpensiveMoisturizerContaining(page, 'Aloe');
  await moisturizerPageAssertions.verifyMoisturizerCartIsNotEmpty(page);
  const almondProduct = await moisturizerPageActions.addLeastExpensiveMoisturizerContaining(page, 'Almond');
  await moisturizerPageAssertions.verifyMoisturizerCartItemCount(page, 2);

  return [aloeProduct, almondProduct];
}

export async function openMoisturizerCart(page: Page): Promise<void> {
  await moisturizerPageActions.clickMoisturizerCart(page);
}
