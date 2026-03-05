import { Page, Locator } from '@playwright/test';

export class ConfirmationPage {
    readonly page: Page;
    readonly confirmationMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        // Same logic as Selenium: first <p> inside a <div>
        this.confirmationMessage = page.locator('div p').first();
    }

    // Get the confirmation text (like getConfirmationMessage() in Selenium)
    async getConfirmationMessage(): Promise<string> {
        return (await this.confirmationMessage.textContent())?.trim() || '';
    }
}