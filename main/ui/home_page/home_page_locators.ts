import { Locator, Page } from '@playwright/test';

export class HomePageLocators {
  readonly temperatureText: Locator;
  readonly buyMoisturizersButton: Locator;
  readonly buySunscreensButton: Locator;

  constructor(page: Page) {
    this.temperatureText = page.locator('#temperature');
    this.buyMoisturizersButton = page.locator('text=Buy moisturizers');
    this.buySunscreensButton = page.locator('text=Buy sunscreens');
  }
}
