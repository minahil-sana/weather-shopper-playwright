import { Page } from '@playwright/test';
import { SunscreenPageActions } from '@main/sunscreen_page/sunscreen_page_actions';
import { SunscreenPageAssertions } from '@main/sunscreen_page/sunscreen_page_assertions';
import { SunscreenPageLocators } from '@main/sunscreen_page/sunscreen_page_locators';

export class SunscreenPageTasks {
  readonly actions: SunscreenPageActions;
  readonly assertions: SunscreenPageAssertions;

  constructor(page: Page) {
    const locators = new SunscreenPageLocators(page);
    this.actions = new SunscreenPageActions(page, locators);
    this.assertions = new SunscreenPageAssertions(locators);
  }

  async add_required_sunscreens_to_cart(): Promise<void> {
    await this.assertions.assert_product_grid_visible();
    await this.actions.add_least_expensive_product_containing('SPF-50');
    await this.assertions.assert_cart_is_not_empty();
    await this.actions.add_least_expensive_product_containing('SPF-30');
    await this.assertions.assert_cart_item_count(2);
  }

  async open_cart(): Promise<void> {
    await this.actions.click_cart();
  }
}
