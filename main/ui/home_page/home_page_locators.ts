import { Locator, Page } from '@playwright/test';

export interface HomePageLocators {
  temperatureText: Locator;
  buyMoisturizersButton: Locator;
  buySunscreensButton: Locator;
}

export function getHomePageLocators(page: Page): HomePageLocators {
  return {
    temperatureText: page.locator('#temperature'),
    buyMoisturizersButton: page.locator('text=Buy moisturizers'),
    buySunscreensButton: page.locator('text=Buy sunscreens'),
  };
}
