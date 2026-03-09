import { expect } from '@playwright/test';
import { HomePageLocators } from '@main/ui/home_page/home_page_locators';

export class HomePageAssertions {
  readonly locators: HomePageLocators;

  constructor(locators: HomePageLocators) {
    this.locators = locators;
  }

  async verifyHomePageLoaded(): Promise<void> {
    await expect(this.locators.temperatureText).toBeVisible();
  }
}
