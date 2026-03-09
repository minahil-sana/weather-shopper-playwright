import { Page } from '@playwright/test';
import { MoisturizerPageLocators } from '@main/ui/moisturizer_page/moisturizer_page_locators';

export class MoisturizerPageActions {
  readonly page: Page;
  readonly locators: MoisturizerPageLocators;

  constructor(page: Page, locators: MoisturizerPageLocators) {
    this.page = page;
    this.locators = locators;
  }

  async addLeastExpensiveProductContaining(keyword: string): Promise<void> {
    await this.page.waitForLoadState('networkidle');
    await this.locators.productBlocks.first().waitFor({ state: 'visible' });

    const count = await this.locators.productBlocks.count();
    let minPrice = Number.MAX_SAFE_INTEGER;
    let targetIndex = -1;

    for (let i = 0; i < count; i++) {
      const product = this.locators.productBlocks.nth(i);
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

    const addButton = this.locators.productBlocks.nth(targetIndex).getByRole('button', { name: 'Add' });
    await addButton.waitFor({ state: 'visible' });
    await this.page.waitForTimeout(500);
    await addButton.click();
  }

  async getCartStatusText(): Promise<string> {
    return (await this.locators.cartStatusSpan.textContent())?.trim() || '';
  }

  async clickCart(): Promise<void> {
    await this.locators.cartButton.click();
  }
}
