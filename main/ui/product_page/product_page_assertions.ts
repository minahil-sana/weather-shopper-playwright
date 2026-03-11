import { expect, Page } from '@playwright/test';
import { getProductPageLocators } from '@main/ui/product_page/product_page_locators';

export async function verifyProductPageOpened(page: Page, type: 'moisturizer' | 'sunscreen'): Promise<void> {
	await expect(page).toHaveURL(new RegExp(type));
}

export async function verifyProductGridVisible(page: Page): Promise<void> {
	const locators = getProductPageLocators(page);
	await locators.productBlocks.first().waitFor({ state: 'visible' });
}

export async function verifyCartIsEmpty(page: Page): Promise<void> {
	const locators = getProductPageLocators(page);
	await expect(locators.cartStatusSpan).toHaveText('Empty');
}

export async function verifyCartIsNotEmpty(page: Page): Promise<void> {
	const locators = getProductPageLocators(page);
	await expect(locators.cartStatusSpan).not.toHaveText('Empty', { timeout: 10000 });
}

export async function verifyCartItemCount(page: Page, expectedCount: number): Promise<void> {
	const locators = getProductPageLocators(page);
	await expect(locators.cartStatusSpan).toContainText(String(expectedCount));
}
