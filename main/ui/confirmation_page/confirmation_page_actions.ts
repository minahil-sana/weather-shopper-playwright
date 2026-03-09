import { ConfirmationPageLocators } from '@main/ui/confirmation_page/confirmation_page_locators';

export class ConfirmationPageActions {
  readonly locators: ConfirmationPageLocators;

  constructor(locators: ConfirmationPageLocators) {
    this.locators = locators;
  }

  async getConfirmationMessage(): Promise<string> {
    return (await this.locators.confirmationMessage.textContent())?.trim() || '';
  }
}
