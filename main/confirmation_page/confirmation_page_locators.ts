import { Locator, Page } from '@playwright/test';

export class ConfirmationPageLocators {
  readonly confirmation_message: Locator;

  constructor(page: Page) {
    this.confirmation_message = page.locator('div p').first();
  }
}
