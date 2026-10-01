import { test, expect, request } from '@playwright/test';

test('API test 1', async ({ page, request }) => {
    await test.step('', async () => {
        const call = await request.get("https://automationexercise.com/");

        expect(await call.status()).toBe(200);
        expect(await call.statusText()).toBe("OK");
    })

})
