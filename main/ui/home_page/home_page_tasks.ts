import { Page } from '@playwright/test';
import { HomePageActions } from '@main/ui/home_page/home_page_actions';
import { HomePageAssertions } from '@main/ui/home_page/home_page_assertions';
import { HomePageLocators } from '@main/ui/home_page/home_page_locators';

export class HomePageTasks {
  readonly actions: HomePageActions;
  readonly assertions: HomePageAssertions;

  constructor(page: Page) {
    const locators = new HomePageLocators(page);
    this.actions = new HomePageActions(page, locators);
    this.assertions = new HomePageAssertions(locators);
  }

  async openHomePage(): Promise<void> {
    await this.actions.navigateToHomePage();
    await this.assertions.verifyHomePageLoaded();
  }

  async getCurrentTemperature(): Promise<number> {
    return this.actions.getTemperatureValue();
  }

  async openMoisturizersPage(): Promise<void> {
    await this.actions.clickBuyMoisturizers();
  }

  async openSunscreensPage(): Promise<void> {
    await this.actions.clickBuySunscreens();
  }
}
