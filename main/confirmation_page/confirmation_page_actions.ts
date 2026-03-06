import { ConfirmationPageLocators } from '@main/confirmation_page/confirmation_page_locators';

export class ConfirmationPageActions {
  readonly locators: ConfirmationPageLocators;

  constructor(locators: ConfirmationPageLocators) {
    this.locators = locators;
  }

  async get_confirmation_message(): Promise<string> {
    return (await this.locators.confirmation_message.textContent())?.trim() || '';
  }
}
