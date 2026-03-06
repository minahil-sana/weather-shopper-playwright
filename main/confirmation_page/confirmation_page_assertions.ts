import { expect } from '@playwright/test';

export class ConfirmationPageAssertions {
  assert_confirmation_message_is_valid(message: string): void {
    if (message.includes('successful')) {
      expect(message).toContain('Your payment was successful');
      return;
    }

    expect(message).toContain('Oh, oh! Your payment did not go through');
  }
}
