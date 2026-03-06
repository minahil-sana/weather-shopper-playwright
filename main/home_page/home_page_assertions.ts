import { expect } from '@playwright/test';
import { HomePageLocators } from '@main/home_page/home_page_locators';

export class HomePageAssertions {
  readonly locators: HomePageLocators;

  constructor(locators: HomePageLocators) {
    this.locators = locators;
  }

  async assert_home_page_loaded(): Promise<void> {
    await expect(this.locators.temperature_text).toBeVisible();
  }
}
