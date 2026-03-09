import { Locator, Page } from '@playwright/test';

export interface ConfirmationPageLocators {
  confirmationMessage: Locator;
}

export function getConfirmationPageLocators(page: Page): ConfirmationPageLocators {
  return {
    confirmationMessage: page.locator('div p').first(),
  };
}
