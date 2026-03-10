import { Page } from '@playwright/test';
import { getProductPageLocators } from '@main/ui/product_page/product_page_locators';

export interface SelectedProduct {
	name: string;
	price: number;
}

export async function addLeastExpensiveProductContaining(page: Page, keyword: string): Promise<SelectedProduct> {
	const locators = getProductPageLocators(page);
	await page.waitForLoadState('networkidle');
	await locators.productBlocks.first().waitFor({ state: 'visible' });

	const count = await locators.productBlocks.count();
	let minPrice = Number.MAX_SAFE_INTEGER;
	let targetIndex = -1;
	let selectedProductName = '';

	for (let index = 0; index < count; index++) {
		const product = locators.productBlocks.nth(index);
		const name = (await product.locator('p.font-weight-bold').textContent())?.toLowerCase();
		const priceText = await product.locator('p:has-text("Price")').textContent();
		if (!name || !priceText) continue;

		if (name.includes(keyword.toLowerCase())) {
			const priceMatch = priceText.match(/\d+/);
			if (!priceMatch) continue;

			const price = parseInt(priceMatch[0], 10);
			if (price < minPrice) {
				minPrice = price;
				targetIndex = index;
				selectedProductName = name;
			}
		}
	}

	if (targetIndex === -1) {
		throw new Error(`No product found containing keyword: ${keyword}`);
	}

	const addButton = locators.productBlocks.nth(targetIndex).getByRole('button', { name: 'Add' });
	await addButton.waitFor({ state: 'visible' });
	await page.waitForTimeout(500);
	await addButton.click();

	return {
		name: selectedProductName,
		price: minPrice,
	};
}

export async function openProductCart(page: Page): Promise<void> {
	const locators = getProductPageLocators(page);
	await locators.cartButton.click();
}
