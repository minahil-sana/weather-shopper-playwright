import { Page } from '@playwright/test';
import { ConfirmationPageActions } from '@main/ui/confirmation_page/confirmation_page_actions';
import { ConfirmationPageAssertions } from '@main/ui/confirmation_page/confirmation_page_assertions';
import { ConfirmationPageLocators } from '@main/ui/confirmation_page/confirmation_page_locators';

export class ConfirmationPageTasks {
  readonly actions: ConfirmationPageActions;
  readonly assertions: ConfirmationPageAssertions;

  constructor(page: Page) {
    const locators = new ConfirmationPageLocators(page);
    this.actions = new ConfirmationPageActions(locators);
    this.assertions = new ConfirmationPageAssertions();
  }

  async validateCheckoutOutcome(): Promise<void> {
    const message = await this.actions.getConfirmationMessage();
    this.assertions.verifyConfirmationMessageIsValid(message);
  }
}
