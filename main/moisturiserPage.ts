import { Page } from '@playwright/test';
import { BaseProductPage } from '@main/baseProductPage';

export class MoisturizerPage extends BaseProductPage {

    constructor(page: Page) {
        super(page);
    }

}