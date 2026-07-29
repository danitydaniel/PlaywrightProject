import { test, expect, request } from '@playwright/test';

const url: string = "https://jsonplaceholder.typicode.com/users";

test.describe('Validate title', () => {

    test('Validate title', async ({ page }) => {
        await test.step('Go to page', async () => {
            await page.goto('https://google.com')
        })
        await test.step('Validate', async () => {
            await expect(page).toHaveTitle("Google");
        })
        await test.step('', async () => {
            await page.close();
        })
    })
});

test.describe('API tests', () => {
    test('', async ({ request }) => {
        const response = await request.get(url);
        const jsonBody = await response.json();
        const first = jsonBody.find((item: any) => item.id === 1);
        const second = jsonBody.find((item: any) => item.id === 2);
        const status = await response.status();
        const statusText = await response.statusText();

        /* console.log(jsonBody);
        console.log(first);
        console.log(first.name);
        */
        console.log(status);
        console.log(statusText);
        console.log(first);
        console.log(second);

    })
});