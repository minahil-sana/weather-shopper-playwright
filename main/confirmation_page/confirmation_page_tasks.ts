import { Page } from '@playwright/test';
import { ConfirmationPageActions } from '@main/confirmation_page/confirmation_page_actions';
import { ConfirmationPageAssertions } from '@main/confirmation_page/confirmation_page_assertions';
import { ConfirmationPageLocators } from '@main/confirmation_page/confirmation_page_locators';

export class ConfirmationPageTasks {
  readonly actions: ConfirmationPageActions;
  readonly assertions: ConfirmationPageAssertions;

  constructor(page: Page) {
    const locators = new ConfirmationPageLocators(page);
    this.actions = new ConfirmationPageActions(locators);
    this.assertions = new ConfirmationPageAssertions();
  }

  async validate_checkout_outcome(): Promise<void> {
    const message = await this.actions.get_confirmation_message();
    this.assertions.assert_confirmation_message_is_valid(message);
  }
}
