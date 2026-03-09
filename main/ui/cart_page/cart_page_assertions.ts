import { expect, Page } from '@playwright/test';

export class CartPageAssertions {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyCartHasTwoItems(productNames: string[], productPrices: number[]): Promise<void> {
    expect(productNames.length).toBe(2);
    expect(productPrices.length).toBe(2);
  }

  async verifyTotalMatchesSum(productPrices: number[], totalPrice: number): Promise<void> {
    const sum = productPrices.reduce((accumulator, current) => accumulator + current, 0);
    expect(totalPrice).toBe(sum);
  }

  async verifyRedirectedToConfirmation(): Promise<void> {
    await expect(this.page).toHaveURL(/confirmation/);
  }
}
