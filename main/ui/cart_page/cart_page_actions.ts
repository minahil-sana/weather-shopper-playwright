import { Page } from '@playwright/test';
import { getCartPageLocators } from '@main/ui/cart_page/cart_page_locators';

export async function getCartProductNames(page: Page): Promise<string[]> {
  const locators = getCartPageLocators(page);
  return locators.productNames.allTextContents();
}

export async function getCartProductPrices(page: Page): Promise<number[]> {
  const locators = getCartPageLocators(page);
  const pricesText = await locators.productPrices.allTextContents();
  return pricesText.map((value) => parseInt(value.replace(/\D/g, ''), 10));
}

export async function getCartTotalPrice(page: Page): Promise<number> {
  const locators = getCartPageLocators(page);
  const text = await locators.totalPrice.textContent();
  if (!text) throw new Error('Total price not found');
  return parseFloat(text.replace(/[^0-9.]/g, ''));
}

export async function clickPayWithCard(page: Page): Promise<void> {
  const locators = getCartPageLocators(page);
  await locators.payWithCardButton.click();
}

