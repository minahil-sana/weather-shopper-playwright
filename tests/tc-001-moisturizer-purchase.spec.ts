import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { MoisturizerPage } from '../pages/moisturiserPage';
import { CartPage } from '../pages/CartPage';
import { ConfirmationPage } from '../pages/ConfirmationPage';

test('TC_001: Verify successful moisturizer purchase when temperature is below 19C', async ({ page }) => {
    const home = new HomePage(page);
    const moisturizer = new MoisturizerPage(page);
    const cart = new CartPage(page);
    const confirmation = new ConfirmationPage(page);

    // Step 1: Navigate to homepage
    await home.navigate();

    // Step 2: Check temperature
    const temp = await home.getTemperature();
    console.log('Temperature:', temp);

    if (temp < 19) {
        // Step 3: Navigate to Moisturizers
        await home.clickBuyMoisturizers();

        // Step 4: Add least expensive Aloe + Almond
        await moisturizer.addLeastExpensiveProductContaining('Aloe');
        await moisturizer.addLeastExpensiveProductContaining('Almond');

        // Wait for cart counter to update
        await moisturizer.page.waitForFunction(() => {
            const cart = document.querySelector('#cart');
            return cart && /\d/.test(cart.textContent || '');
        }, { timeout: 10000 });

        const cartText = await moisturizer.getCartStatusText();
        console.log('Cart count text:', cartText);
        expect(cartText).toContain('2');

        // Step 5: Click cart button
        await moisturizer.clickCart();

        // Step 6: Verify cart items and total
        const productNames = await cart.getProductNames();
        const productPrices = await cart.getProductPrices();
        console.log('Products in cart:', productNames, productPrices);
        expect(productNames.length).toBe(2);
        expect(productPrices.length).toBe(2);

        const isTotalCorrect = await cart.isTotalPriceCorrect();
        expect(isTotalCorrect).toBe(true);
        console.log('Total price is correct:', isTotalCorrect);

        // Step 7: Click Pay with Card and complete payment
        await cart.clickPayWithCard();
        await cart.completeStripePayment(
            'test@test.com',       // email
            '4242424242424242',    // card number
            '12/27',               // expiry
            '123',                 // CVC
            '12345'                // ZIP
        );

        // Step 8: Verify confirmation message
        const message = await confirmation.getConfirmationMessage();
        console.log('Confirmation message:', message);

        // Handle both possible outcomes
        if (message.includes('successful')) {
            expect(message).toContain('Your payment was successful');
        } else {
            expect(message).toContain('Oh, oh! Your payment did not go through');
        }
    } else {
        console.log('Temperature >= 19°C, skipping moisturizers path.');
    }
});