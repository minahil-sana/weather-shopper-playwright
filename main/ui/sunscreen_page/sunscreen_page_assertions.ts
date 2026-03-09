import { expect } from '@playwright/test';
import { SunscreenPageLocators } from '@main/ui/sunscreen_page/sunscreen_page_locators';

export class SunscreenPageAssertions {
  readonly locators: SunscreenPageLocators;

  constructor(locators: SunscreenPageLocators) {
    this.locators = locators;
  }

  async verifyProductGridVisible(): Promise<void> {
    await this.locators.productBlocks.first().waitFor({ state: 'visible' });
  }

  async verifyCartIsNotEmpty(): Promise<void> {
    await expect(this.locators.cartStatusSpan).not.toHaveText('Empty', { timeout: 10000 });
  }

  async verifyCartItemCount(expected_count: number): Promise<void> {
    await expect(this.locators.cartStatusSpan).toContainText(String(expected_count));
  }
}
