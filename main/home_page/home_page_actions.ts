import { Page } from '@playwright/test';
import { HomePageLocators } from '@main/home_page/home_page_locators';

export class HomePageActions {
  readonly page: Page;
  readonly locators: HomePageLocators;

  constructor(page: Page, locators: HomePageLocators) {
    this.page = page;
    this.locators = locators;
  }

  async navigate_to_home_page(): Promise<void> {
    await this.page.goto('http://weathershopper.pythonanywhere.com/');
  }

  async get_temperature_value(): Promise<number> {
    const text = await this.locators.temperature_text.textContent();
    if (!text) throw new Error('Temperature not found');

    const match = text.match(/\d+/);
    if (!match) throw new Error('Temperature value not found');

    return parseInt(match[0], 10);
  }

  async click_buy_moisturizers(): Promise<void> {
    await this.locators.buy_moisturizers_button.click();
  }

  async click_buy_sunscreens(): Promise<void> {
    await this.locators.buy_sunscreens_button.click();
  }
}
