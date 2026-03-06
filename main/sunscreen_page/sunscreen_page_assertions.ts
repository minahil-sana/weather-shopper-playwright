import { expect } from '@playwright/test';
import { SunscreenPageLocators } from '@main/sunscreen_page/sunscreen_page_locators';

export class SunscreenPageAssertions {
  readonly locators: SunscreenPageLocators;

  constructor(locators: SunscreenPageLocators) {
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
