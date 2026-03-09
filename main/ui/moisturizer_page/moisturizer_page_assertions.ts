import { expect } from '@playwright/test';
import { MoisturizerPageLocators } from '@main/ui/moisturizer_page/moisturizer_page_locators';

export class MoisturizerPageAssertions {
  readonly locators: MoisturizerPageLocators;

  constructor(locators: MoisturizerPageLocators) {
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
