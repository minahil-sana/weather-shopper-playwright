import { expect } from '@playwright/test';
import { Page } from '@playwright/test';
import { getConfirmationMessage } from '@main/ui/confirmation_page/confirmation_page_actions';


export async function validateCheckoutOutcome(page: Page): Promise<void> {
  const message = await getConfirmationMessage(page);
  expect(message).toContain('Your payment was successful');
}
