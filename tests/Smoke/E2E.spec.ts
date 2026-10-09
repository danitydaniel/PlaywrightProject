import { test, expect, request, Locator } from '@playwright/test';
import { homePage } from '../Pages/homePage';

test('Login E2E', async ({ page, request }) => {
    const home: homePage = new homePage(page); //New instance of home page

    await page.goto("https://automationexercise.com/");

    const GetUrl = await request.get("https://automationexercise.com/api/productsList");
    const body = await GetUrl.json();
    const status = await GetUrl.status();
    const statusText = await GetUrl.statusText();
    

    expect(home.ImgLogo).toBeVisible;

    expect(status).toBe(200);
    expect(statusText).toBe("OK");

    page.close();
    console.log(body);
});