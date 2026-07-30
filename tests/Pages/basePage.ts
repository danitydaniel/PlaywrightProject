import { Page, Locator } from '@playwright/test';

export class basePage {
    page: Page;
    url: string;
    title: string;

    constructor(page: Page, url: string, title: string) {
        this.page = page;
        this.url = url;
        this.title = title;
    }
}