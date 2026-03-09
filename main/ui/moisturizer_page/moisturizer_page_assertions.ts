import { expect, Page } from '@playwright/test';
import { getMoisturizerPageLocators } from '@main/ui/moisturizer_page/moisturizer_page_locators';

export async function verifyMoisturizerPageOpened(page: Page): Promise<void> {
  await expect(page).toHaveURL(/moisturizer/);
}

export async function verifyMoisturizerProductGridVisible(page: Page): Promise<void> {
  const locators = getMoisturizerPageLocators(page);
  await locators.productBlocks.first().waitFor({ state: 'visible' });
}

export async function verifyMoisturizerCartIsEmpty(page: Page): Promise<void> {
  const locators = getMoisturizerPageLocators(page);
  await expect(locators.cartStatusSpan).toHaveText('Empty');
}

export async function verifyMoisturizerCartIsNotEmpty(page: Page): Promise<void> {
  const locators = getMoisturizerPageLocators(page);
  await expect(locators.cartStatusSpan).not.toHaveText('Empty', { timeout: 10000 });
}

export async function verifyMoisturizerCartItemCount(page: Page, expectedCount: number): Promise<void> {
  const locators = getMoisturizerPageLocators(page);
  await expect(locators.cartStatusSpan).toContainText(String(expectedCount));
}
