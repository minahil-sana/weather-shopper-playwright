//main/cartPage.ts
import { Page, Locator , FrameLocator, expect } from '@playwright/test';

export class CartPage {
    readonly page: Page;

    // --- Locators ---
    readonly productNames: Locator;
    readonly productPrices: Locator;
    readonly totalPrice: Locator;
    readonly payWithCardButton: Locator;
    readonly stripeIframe: FrameLocator;

    constructor(page: Page) {
        this.page = page;

        // Cart table
        this.productNames = page.locator('table.table-striped tbody tr td:nth-child(1)');
        this.productPrices = page.locator('table.table-striped tbody tr td:nth-child(2)');
        this.totalPrice = page.locator('#total');

        // Payment
        this.payWithCardButton = page.locator('button:has-text("Pay with Card")');
        this.stripeIframe = page.frameLocator('iframe[name="stripe_checkout_app"]');
    }

    // --- Cart Info Methods ---
    async getProductNames(): Promise<string[]> {
        return this.productNames.allTextContents();
    }

    async getProductPrices(): Promise<number[]> {
        const pricesText = await this.productPrices.allTextContents();
        return pricesText.map(p => parseInt(p.replace(/\D/g, ''), 10));
    }

    async getTotalPrice(): Promise<number> {
        const text = await this.totalPrice.textContent();
        if (!text) throw new Error('Total price not found');
        return parseFloat(text.replace(/[^0-9.]/g, ''));
    }

    async isTotalPriceCorrect(): Promise<boolean> {
        const prices = await this.getProductPrices();
        const sum = prices.reduce((acc, val) => acc + val, 0);
        const total = await this.getTotalPrice();
        return sum === total;
    }

    // --- Actions ---
    async clickPayWithCard() {
        await this.payWithCardButton.click();
    }

    async completeStripePayment(
    email: string,
    cardNumber: string,
    expiry: string,
    cvc: string,
    zip: string
) {
    const frame = this.stripeIframe;

    // Fill email
    await frame.locator('input[type="email"]').fill(email);

    // Type card number slowly
    const cardNumberField = frame.locator('input[placeholder="Card number"]');
    await cardNumberField.click();
    for (const digit of cardNumber) {
        await cardNumberField.pressSequentially(digit, { delay: 100 }); // small delay per digit
    }

    // Fill expiry
    const expiryField = frame.locator('input[placeholder="MM / YY"]');
    await expiryField.waitFor({ state: 'visible', timeout: 15000 });
    await expiryField.fill(expiry);

    // Fill CVC
    const cvcField = frame.locator('input[placeholder="CVC"]');
    await cvcField.waitFor({ state: 'visible', timeout: 15000 });
    await cvcField.fill(cvc);

    // Fill ZIP – wait for it to appear with retries
    const zipField = frame.locator('input[placeholder="ZIP Code"]');
    await zipField.waitFor({ state: 'visible', timeout: 20000 });
    await zipField.fill(zip);

    // Submit
    await frame.locator('button[type="submit"]#submitButton').click();

    // Wait for confirmation page
    await expect(this.page).toHaveURL(/confirmation/);
}

    
}