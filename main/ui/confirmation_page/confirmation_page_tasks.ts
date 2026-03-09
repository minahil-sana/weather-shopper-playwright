import { Page } from '@playwright/test';
import { getConfirmationMessage } from '@main/ui/confirmation_page/confirmation_page_actions';
import { verifyConfirmationMessageIsValid } from '@main/ui/confirmation_page/confirmation_page_assertions';

export async function validateCheckoutOutcome(page: Page): Promise<void> {
  const message = await getConfirmationMessage(page);
  verifyConfirmationMessageIsValid(message);
}
