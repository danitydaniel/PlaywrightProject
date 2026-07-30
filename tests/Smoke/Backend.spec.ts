import { test, expect, request } from '@playwright/test';

const url: string = "https://jsonplaceholder.typicode.com/users";

test.describe('Validate title', () => {

    test("Web page is accessible", async ({ page }) => {

        await test.step('When I go to page', async () => {
            await page.goto('');
        })

        await test.step('Then I expect to see tittle', async () => {
            // Expect a title "to contain" a substring.
            await expect(page).toHaveTitle("Automation Exercise");
        })
        page.close();
    });
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