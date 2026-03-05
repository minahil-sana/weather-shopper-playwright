//main/homePage.ts
import { Page, Locator } from '@playwright/test';

export class HomePage {

    readonly page: Page;
    readonly temperatureText: Locator;
    readonly buyMoisturizersButton: Locator;
    readonly buySunscreensButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.temperatureText = page.locator('#temperature');
        this.buyMoisturizersButton = page.locator('text=Buy moisturizers');
        this.buySunscreensButton = page.locator('text=Buy sunscreens');
    }

    async navigate() {
        await this.page.goto('http://weathershopper.pythonanywhere.com/');
    }

    async getTemperature(): Promise<number> {
        // Get the full text of the temperature span
        const text = await this.temperatureText.textContent(); // e.g., "38 °C"
        if (!text) throw new Error('Temperature not found');

        // Extract only digits using regex
        const match = text.match(/\d+/);
        if (!match) throw new Error('Temperature value not found');

        // Convert to number and return
        return parseInt(match[0], 10);
    }

    async clickBuyMoisturizers() {
        await this.buyMoisturizersButton.click();
    }

    async clickBuySunscreens() {
        await this.buySunscreensButton.click();
    }
}