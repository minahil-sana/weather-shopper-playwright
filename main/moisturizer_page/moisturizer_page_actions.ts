import { Page } from '@playwright/test';
import { MoisturizerPageLocators } from '@main/moisturizer_page/moisturizer_page_locators';

export class MoisturizerPageActions {
  readonly page: Page;
  readonly locators: MoisturizerPageLocators;

  constructor(page: Page, locators: MoisturizerPageLocators) {
    this.page = page;
    this.locators = locators;
  }

  async add_least_expensive_product_containing(keyword: string): Promise<void> {
    await this.page.waitForLoadState('networkidle');
    await this.locators.product_blocks.first().waitFor({ state: 'visible' });

    const count = await this.locators.product_blocks.count();
    let min_price = Number.MAX_SAFE_INTEGER;
    let target_index = -1;

    for (let i = 0; i < count; i++) {
      const product = this.locators.product_blocks.nth(i);
      const name = (await product.locator('p.font-weight-bold').textContent())?.toLowerCase();
      const price_text = await product.locator('p:has-text("Price")').textContent();
      if (!name || !price_text) continue;

      if (name.includes(keyword.toLowerCase())) {
        const price_match = price_text.match(/\d+/);
        if (!price_match) continue;

        const price = parseInt(price_match[0], 10);
        if (price < min_price) {
          min_price = price;
          target_index = i;
        }
      }
    }

    if (target_index === -1) {
      throw new Error(`No product found containing keyword: ${keyword}`);
    }

    const add_button = this.locators.product_blocks.nth(target_index).getByRole('button', { name: 'Add' });
    await add_button.waitFor({ state: 'visible' });
    await this.page.waitForTimeout(500);
    await add_button.click();
  }

  async get_cart_status_text(): Promise<string> {
    return (await this.locators.cart_status_span.textContent())?.trim() || '';
  }

  async click_cart(): Promise<void> {
    await this.locators.cart_button.click();
  }
}
