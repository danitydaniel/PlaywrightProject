import { test, expect, request, Locator } from '@playwright/test';

test('Login E2E', async ({ page, request }) => {
    //LOCATORS
    const logo: Locator = await page.locator('//div [@class="logo pull-left"]');

    await page.goto("https://automationexercise.com/");

    const GetUrl = await request.get("https://automationexercise.com/api/productsList");
    const body = await GetUrl.json();
    const status = await GetUrl.status();
    const statusText = await GetUrl.statusText();

    expect(logo).toBeVisible;

    expect(status).toBe(200);
    expect(statusText).toBe("OK");

    page.close();
    console.log(body);
});