import { Page } from '@playwright/test';
import * as productPageActions from '@main/ui/product_page/product_page_actions';
import * as productPageAssertions from '@main/ui/product_page/product_page_assertions';

export async function addRequiredMoisturizersToCart(
	page: Page,
): Promise<productPageActions.SelectedProduct[]> {
	await productPageAssertions.verifyProductPageOpened(page, 'moisturizer');
	await productPageAssertions.verifyProductGridVisible(page);
	await productPageAssertions.verifyCartIsEmpty(page);

	const aloeProduct = await productPageActions.addLeastExpensiveProductContaining(page, 'Aloe');
	await productPageAssertions.verifyCartIsNotEmpty(page);
	const almondProduct = await productPageActions.addLeastExpensiveProductContaining(page, 'Almond');
	await productPageAssertions.verifyCartItemCount(page, 2);

	return [aloeProduct, almondProduct];
}

export async function addRequiredSunscreensToCart(
	page: Page,
): Promise<productPageActions.SelectedProduct[]> {
	await productPageAssertions.verifyProductPageOpened(page, 'sunscreen');
	await productPageAssertions.verifyProductGridVisible(page);
	await productPageAssertions.verifyCartIsEmpty(page);

	const spf50Product = await productPageActions.addLeastExpensiveProductContaining(page, 'SPF-50');
	await productPageAssertions.verifyCartIsNotEmpty(page);
	const spf30Product = await productPageActions.addLeastExpensiveProductContaining(page, 'SPF-30');
	await productPageAssertions.verifyCartItemCount(page, 2);

	return [spf50Product, spf30Product];
}
