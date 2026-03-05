import { Page, Locator, expect } from '@playwright/test';

export class BaseProductPage {

    readonly page: Page;
    readonly productBlocks: Locator;
    readonly cartButton: Locator;
    readonly cartStatusSpan: Locator;

    constructor(page: Page) {
        this.page = page;

        this.productBlocks = page.locator('div.text-center.col-4');
        this.cartButton = page.locator('button:has-text("Cart")');
        this.cartStatusSpan = page.locator('button:has-text("Cart") >> span');
    }

    // Add the least expensive product containing keyword
    async addLeastExpensiveProductContaining(keyword: string) {

        await this.page.waitForLoadState('networkidle');
        await this.productBlocks.first().waitFor({ state: 'visible' });

        const count = await this.productBlocks.count();

        let minPrice = Number.MAX_SAFE_INTEGER;
        let targetIndex = -1;

        for (let i = 0; i < count; i++) {

            const product = this.productBlocks.nth(i);

            const name = (await product.locator('p.font-weight-bold').textContent())?.toLowerCase();
            const priceText = await product.locator('p:has-text("Price")').textContent();

            if (!name || !priceText) continue;

            if (name.includes(keyword.toLowerCase())) {

                const priceMatch = priceText.match(/\d+/);
                if (!priceMatch) continue;

                const price = parseInt(priceMatch[0], 10);

                if (price < minPrice) {
                    minPrice = price;
                    targetIndex = i;
                }
            }
        }

        if (targetIndex === -1) {
            throw new Error(`No product found containing keyword: ${keyword}`);
        }

        const addButton = this.productBlocks
            .nth(targetIndex)
            .getByRole('button', { name: 'Add' });

        await addButton.waitFor({ state: 'visible' });

        await this.page.waitForTimeout(500);

        await addButton.click();

        await expect(this.cartStatusSpan).not.toHaveText('Empty', { timeout: 10000 });
    }

    async getCartStatusText(): Promise<string> {
        return (await this.cartStatusSpan.textContent())?.trim() || '';
    }

    async clickCart() {
        await this.cartButton.click();
    }
}