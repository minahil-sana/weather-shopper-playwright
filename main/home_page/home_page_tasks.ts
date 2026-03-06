import { Page } from '@playwright/test';
import { HomePageActions } from '@main/home_page/home_page_actions';
import { HomePageAssertions } from '@main/home_page/home_page_assertions';
import { HomePageLocators } from '@main/home_page/home_page_locators';

export class HomePageTasks {
  readonly actions: HomePageActions;
  readonly assertions: HomePageAssertions;

  constructor(page: Page) {
    const locators = new HomePageLocators(page);
    this.actions = new HomePageActions(page, locators);
    this.assertions = new HomePageAssertions(locators);
  }

  async open_home_page(): Promise<void> {
    await this.actions.navigate_to_home_page();
    await this.assertions.assert_home_page_loaded();
  }

  async get_current_temperature(): Promise<number> {
    return this.actions.get_temperature_value();
  }

  async open_moisturizers_page(): Promise<void> {
    await this.actions.click_buy_moisturizers();
  }

  async open_sunscreens_page(): Promise<void> {
    await this.actions.click_buy_sunscreens();
  }
}
