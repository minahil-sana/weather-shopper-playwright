import { Locator, Page } from '@playwright/test';

export class HomePageLocators {
  readonly temperature_text: Locator;
  readonly buy_moisturizers_button: Locator;
  readonly buy_sunscreens_button: Locator;

  constructor(page: Page) {
    this.temperature_text = page.locator('#temperature');
    this.buy_moisturizers_button = page.locator('text=Buy moisturizers');
    this.buy_sunscreens_button = page.locator('text=Buy sunscreens');
  }
}
