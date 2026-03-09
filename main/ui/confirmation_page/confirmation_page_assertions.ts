import { expect } from '@playwright/test';

export function verifyConfirmationMessageIsValid(confirmationMessage: string): void {
  expect(confirmationMessage).toContain('Your payment was successful');
}
