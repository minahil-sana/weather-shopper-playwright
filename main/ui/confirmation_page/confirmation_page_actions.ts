import { Page } from '@playwright/test';
import { getConfirmationPageLocators } from '@main/ui/confirmation_page/confirmation_page_locators';

export async function getConfirmationMessage(page: Page): Promise<string> {
  const locators = getConfirmationPageLocators(page);
  return (await locators.confirmationMessage.textContent())?.trim() || '';
}
