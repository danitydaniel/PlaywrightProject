import { test, expect, request } from '@playwright/test';

const url: string = "https://automationexercise.com/api/brandsList";


test.describe('Web page is reachable', () => {

    test("Web page is displayed", async ({ page }) => {

        await test.step('When I go to page', async () => {
            await page.goto('');
        })

        await test.step('Then I expect to see tittle', async () => {
            // Expect a title "to contain" a substring.
            await expect(page).toHaveTitle("Automation Exercise");
        })
        page.close();
    });

    test('Backend is responding', async ({ request }) => {
        const response = await request.get(url);
        const jsonBody = await response.json();
        const first = jsonBody.brands.find((item: any) => item.id === 4);
        const second = jsonBody.brands.find((item: any) => item.id === 2);
        //const first = jsonBody.brands[2];
        //const second =jsonBody.brands[4];

        const status = await response.status();
        const statusText = await response.statusText();

        console.log(status);
        console.log(statusText);

        console.log(jsonBody);
        console.log(first);
        console.log(second);

    });

    test('Get web page', async ({ page, request }) => {
        const start = Date.now();
        const response = await request.get('https://automationexercise.com');
        const duration = Date.now() - start;

        expect(response.ok()).toBeTruthy();
        expect(duration).toBeLessThan(3000); // menos de 3 segundos
        expect(response.status()).toBe(200);
        console.log(duration);


    })

});