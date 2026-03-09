import { Locator, Page } from '@playwright/test';

export class ConfirmationPageLocators {
  readonly confirmationMessage: Locator;

  constructor(page: Page) {
    this.confirmationMessage = page.locator('div p').first();
  }
}
