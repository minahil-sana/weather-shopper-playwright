import { expect, Page } from '@playwright/test';

export interface SelectedProductForCart {
  name: string;
  price: number;
}

function normalizeProductName(value: string): string {
  return value.trim().toLowerCase();
}

export async function verifyCartPageOpened(page: Page): Promise<void> {
  await expect(page).toHaveURL(/cart/);
}

export async function verifyCartHasTwoItems(productNames: string[], productPrices: number[]): Promise<void> {
  expect(productNames.length).toBe(2);
  expect(productPrices.length).toBe(2);
}

export async function verifyCartProductsMatchSelected(
  actualProductNames: string[],
  actualProductPrices: number[],
  selectedProducts: SelectedProductForCart[],
): Promise<void> {
  const actualProducts = actualProductNames.map((name, index) => ({
    name: normalizeProductName(name),
    price: actualProductPrices[index],
  }));

  const expectedProducts = selectedProducts.map((product) => ({
    name: normalizeProductName(product.name),
    price: product.price,
  }));

  const sortKey = (product: SelectedProductForCart): string => `${product.name}-${product.price}`;
  actualProducts.sort((left, right) => sortKey(left).localeCompare(sortKey(right)));
  expectedProducts.sort((left, right) => sortKey(left).localeCompare(sortKey(right)));

  expect(actualProducts).toEqual(expectedProducts);
}

export async function verifyCartTotalMatchesSum(productPrices: number[], totalPrice: number): Promise<void> {
  const sum = productPrices.reduce((accumulator, current) => accumulator + current, 0);
  expect(totalPrice).toBe(sum);
}

export async function verifyRedirectedToConfirmation(page: Page): Promise<void> {
  await expect(page).toHaveURL(/confirmation/);
}
