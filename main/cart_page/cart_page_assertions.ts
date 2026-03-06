import { expect, Page } from '@playwright/test';

export class CartPageAssertions {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async assert_cart_has_two_items(product_names: string[], product_prices: number[]): Promise<void> {
    expect(product_names.length).toBe(2);
    expect(product_prices.length).toBe(2);
  }

  async assert_total_matches_sum(product_prices: number[], total_price: number): Promise<void> {
    const sum = product_prices.reduce((accumulator, current) => accumulator + current, 0);
    expect(total_price).toBe(sum);
  }

  async assert_redirected_to_confirmation(): Promise<void> {
    await expect(this.page).toHaveURL(/confirmation/);
  }
}
