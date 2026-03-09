import { expect, Page } from '@playwright/test';
import { getSunscreenPageLocators } from '@main/ui/sunscreen_page/sunscreen_page_locators';

export async function verifySunscreenPageOpened(page: Page): Promise<void> {
  await expect(page).toHaveURL(/sunscreen/);
}

export async function verifySunscreenProductGridVisible(page: Page): Promise<void> {
  const locators = getSunscreenPageLocators(page);
  await locators.productBlocks.first().waitFor({ state: 'visible' });
}

export async function verifySunscreenCartIsEmpty(page: Page): Promise<void> {
  const locators = getSunscreenPageLocators(page);
  await expect(locators.cartStatusSpan).toHaveText('Empty');
}

export async function verifySunscreenCartIsNotEmpty(page: Page): Promise<void> {
  const locators = getSunscreenPageLocators(page);
  await expect(locators.cartStatusSpan).not.toHaveText('Empty', { timeout: 10000 });
}

export async function verifySunscreenCartItemCount(page: Page, expectedCount: number): Promise<void> {
  const locators = getSunscreenPageLocators(page);
  await expect(locators.cartStatusSpan).toContainText(String(expectedCount));
}
