import { Page } from '@playwright/test';
import { HomePageLocators } from '@main/ui/home_page/home_page_locators';

export class HomePageActions {
  readonly page: Page;
  readonly locators: HomePageLocators;

  constructor(page: Page, locators: HomePageLocators) {
    this.page = page;
    this.locators = locators;
  }

  async navigateToHomePage(): Promise<void> {
    await this.page.goto('http://weathershopper.pythonanywhere.com/');
  }

  async getTemperatureValue(): Promise<number> {
    const text = await this.locators.temperatureText.textContent();
    if (!text) throw new Error('Temperature not found');

    const match = text.match(/\d+/);
    if (!match) throw new Error('Temperature value not found');

    return parseInt(match[0], 10);
  }

  async clickBuyMoisturizers(): Promise<void> {
    await this.locators.buyMoisturizersButton.click();
  }

  async clickBuySunscreens(): Promise<void> {
    await this.locators.buySunscreensButton.click();
  }
}
