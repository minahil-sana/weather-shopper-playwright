import { expect } from '@playwright/test';

export class ConfirmationPageAssertions {
  verifyConfirmationMessageIsValid(confirmationMessage: string): void {
    if (confirmationMessage.includes('successful')) {
      expect(confirmationMessage).toContain('Your payment was successful');
      return;
    }

    expect(confirmationMessage).toContain('Oh, oh! Your payment did not go through');
  }
}
