import { Page } from '@playwright/test';
import { BaseProductPage } from '@main/baseProductPage';

export class SunscreenPage extends BaseProductPage {

    constructor(page: Page) {
        super(page);
    }

}