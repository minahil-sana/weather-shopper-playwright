import { Page } from '@playwright/test';
import { getHomePageLocators } from '@main/ui/home_page/home_page_locators';

export async function navigateToHomePage(page: Page): Promise<void> {
  await page.goto('http://weathershopper.pythonanywhere.com/');
}

export async function getTemperatureValue(page: Page): Promise<number> {
  const locators = getHomePageLocators(page);
  const text = await locators.temperatureText.textContent();
  if (!text) throw new Error('Temperature not found');

  const match = text.match(/\d+/);
  if (!match) throw new Error('Temperature value not found');

  return parseInt(match[0], 10);
}

export async function clickBuyMoisturizers(page: Page): Promise<void> {
  const locators = getHomePageLocators(page);
  await locators.buyMoisturizersButton.click();
}

export async function clickBuySunscreens(page: Page): Promise<void> {
  const locators = getHomePageLocators(page);
  await locators.buySunscreensButton.click();
}
