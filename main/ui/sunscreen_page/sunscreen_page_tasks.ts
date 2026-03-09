import { Page } from '@playwright/test';
import { SunscreenPageActions } from '@main/ui/sunscreen_page/sunscreen_page_actions';
import { SunscreenPageAssertions } from '@main/ui/sunscreen_page/sunscreen_page_assertions';
import { SunscreenPageLocators } from '@main/ui/sunscreen_page/sunscreen_page_locators';

export class SunscreenPageTasks {
  readonly actions: SunscreenPageActions;
  readonly assertions: SunscreenPageAssertions;

  constructor(page: Page) {
    const locators = new SunscreenPageLocators(page);
    this.actions = new SunscreenPageActions(page, locators);
    this.assertions = new SunscreenPageAssertions(locators);
  }

  async addRequiredSunscreensToCart(): Promise<void> {
    await this.assertions.verifyProductGridVisible();
    await this.actions.addLeastExpensiveProductContaining('SPF-50');
    await this.assertions.verifyCartIsNotEmpty();
    await this.actions.addLeastExpensiveProductContaining('SPF-30');
    await this.assertions.verifyCartItemCount(2);
  }

  async openCart(): Promise<void> {
    await this.actions.clickCart();
  }
}
