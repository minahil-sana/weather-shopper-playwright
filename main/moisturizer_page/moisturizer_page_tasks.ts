import { Page } from '@playwright/test';
import { MoisturizerPageActions } from '@main/moisturizer_page/moisturizer_page_actions';
import { MoisturizerPageAssertions } from '@main/moisturizer_page/moisturizer_page_assertions';
import { MoisturizerPageLocators } from '@main/moisturizer_page/moisturizer_page_locators';

export class MoisturizerPageTasks {
  readonly actions: MoisturizerPageActions;
  readonly assertions: MoisturizerPageAssertions;

  constructor(page: Page) {
    const locators = new MoisturizerPageLocators(page);
    this.actions = new MoisturizerPageActions(page, locators);
    this.assertions = new MoisturizerPageAssertions(locators);
  }

  async add_required_moisturizers_to_cart(): Promise<void> {
    await this.assertions.assert_product_grid_visible();
    await this.actions.add_least_expensive_product_containing('Aloe');
    await this.assertions.assert_cart_is_not_empty();
    await this.actions.add_least_expensive_product_containing('Almond');
    await this.assertions.assert_cart_item_count(2);
  }

  async open_cart(): Promise<void> {
    await this.actions.click_cart();
  }
}
