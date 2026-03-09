import { expect, Page } from '@playwright/test';
import { getHomePageLocators } from '@main/ui/home_page/home_page_locators';

export async function verifyHomePageLoaded(page: Page): Promise<void> {
  const locators = getHomePageLocators(page);
  await expect(locators.temperatureText).toBeVisible();
}
