import { Page } from '@playwright/test';
import { MoisturizerPageActions } from '@main/ui/moisturizer_page/moisturizer_page_actions';
import { MoisturizerPageAssertions } from '@main/ui/moisturizer_page/moisturizer_page_assertions';
import { MoisturizerPageLocators } from '@main/ui/moisturizer_page/moisturizer_page_locators';

export class MoisturizerPageTasks {
  readonly actions: MoisturizerPageActions;
  readonly assertions: MoisturizerPageAssertions;

  constructor(page: Page) {
    const locators = new MoisturizerPageLocators(page);
    this.actions = new MoisturizerPageActions(page, locators);
    this.assertions = new MoisturizerPageAssertions(locators);
  }

  async addRequiredMoisturizersToCart(): Promise<void> {
    await this.assertions.verifyProductGridVisible();
    await this.actions.addLeastExpensiveProductContaining('Aloe');
    await this.assertions.verifyCartIsNotEmpty();
    await this.actions.addLeastExpensiveProductContaining('Almond');
    await this.assertions.verifyCartItemCount(2);
  }

  async openCart(): Promise<void> {
    await this.actions.clickCart();
  }
}
