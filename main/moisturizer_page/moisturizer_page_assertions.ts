import { expect } from '@playwright/test';
import { MoisturizerPageLocators } from '@main/moisturizer_page/moisturizer_page_locators';

export class MoisturizerPageAssertions {
  readonly locators: MoisturizerPageLocators;

  constructor(locators: MoisturizerPageLocators) {
    this.locators = locators;
  }

  async assert_product_grid_visible(): Promise<void> {
    await this.locators.product_blocks.first().waitFor({ state: 'visible' });
  }

  async assert_cart_is_not_empty(): Promise<void> {
    await expect(this.locators.cart_status_span).not.toHaveText('Empty', { timeout: 10000 });
  }

  async assert_cart_item_count(expected_count: number): Promise<void> {
    await expect(this.locators.cart_status_span).toContainText(String(expected_count));
  }
}
