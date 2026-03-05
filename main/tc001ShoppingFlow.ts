//main/tc001ShoppingFlow.ts
import { expect, Page } from '@playwright/test';
import paymentData from '@test-data/payment-data.json';
import { CartPage } from '@main/cartPage';
import { ConfirmationPage } from '@main/confirmationPage';
import { HomePage } from '@main/homePage';
import { MoisturizerPage } from '@main/moisturiserPage';
import { SunscreenPage } from '@main/sunscreenPage';

export async function runTc001ShoppingFlow(page: Page): Promise<void> {

  const home = new HomePage(page);
  const moisturizer = new MoisturizerPage(page);
  const sunscreen = new SunscreenPage(page);
  const cart = new CartPage(page);
  const confirmation = new ConfirmationPage(page);

  await home.navigate();

  const temp = await home.getTemperature();
  console.log('Temperature:', temp);

  // -------------------------
  // CATEGORY SELECTION
  // -------------------------

  if (temp < 19) {

    console.log('Temperature < 19C → Buying Moisturizers');

    await home.clickBuyMoisturizers();

    await moisturizer.addLeastExpensiveProductContaining('Aloe');
    await moisturizer.addLeastExpensiveProductContaining('Almond');

  } 
  else if (temp > 34) {

    console.log('Temperature > 34C → Buying Sunscreens');

    await home.clickBuySunscreens();

    await sunscreen.addLeastExpensiveProductContaining('SPF-50');
    await sunscreen.addLeastExpensiveProductContaining('SPF-30');

  } 
  else {

    console.log(`Temperature ${temp}°C between 19–34 → No shopping required`);
    return;

  }

  // -------------------------
  // CART VALIDATION
  // -------------------------

  await page.waitForFunction(() => {
    const cartElement = document.querySelector('#cart');
    return cartElement && /\d/.test(cartElement.textContent || '');
  });

  const cartText = await page.locator('#cart').textContent();
  console.log('Cart count text:', cartText);

  expect(cartText).toContain('2');

  await page.click('button:has-text("Cart")');

  // -------------------------
  // CART PAGE VALIDATIONS
  // -------------------------

  const productNames = await cart.getProductNames();
  const productPrices = await cart.getProductPrices();

  console.log('Products in cart:', productNames, productPrices);

  expect(productNames.length).toBe(2);
  expect(productPrices.length).toBe(2);

  const isTotalCorrect = await cart.isTotalPriceCorrect();
  console.log('Total price is correct:', isTotalCorrect);

  expect(isTotalCorrect).toBe(true);

  // -------------------------
  // PAYMENT
  // -------------------------

  await cart.clickPayWithCard();

  await cart.completeStripePayment(
    paymentData.email,
    paymentData.cardNumber,
    paymentData.expiry,
    paymentData.cvc,
    paymentData.zip
  );

  // -------------------------
  // CONFIRMATION
  // -------------------------

  const message = await confirmation.getConfirmationMessage();

  console.log('Confirmation message:', message);

  if (message.includes('successful')) {
    expect(message).toContain('Your payment was successful');
  } else {
    expect(message).toContain('Oh, oh! Your payment did not go through');
  }
}