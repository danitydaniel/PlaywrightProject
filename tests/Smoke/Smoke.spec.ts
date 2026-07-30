import { test, expect, request, Locator } from "@playwright/test";
import { faker } from "@faker-js/faker";

const burl: string = "https://automationexercise.com";
let email: string = "";
let pwd: string = "";

test.describe("User can login", () => {

  test("Endpoint can create a new user", async ({ request }) => {
    await test.step('Given I set the user data', async () => {
      const birthDate = faker.date.birthdate({ min: 18, max: 65, mode: "age" });

      const userData = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        title: faker.helpers.arrayElement(["Mr", "Mrs", "Miss"]), // elige uno al azar de la lista
        birth_date: birthDate.getDate().toString(),
        birth_month: (birthDate.getMonth() + 1).toString(),
        birth_year: birthDate.getFullYear().toString(),
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        company: faker.company.name(),
        address1: faker.location.streetAddress(),
        address2: faker.location.secondaryAddress(),
        country: faker.location.country(),
        zipcode: faker.location.zipCode(),
        state: faker.location.state(),
        city: faker.location.city(),
        mobile_number: faker.phone.number(),
      };

      const resp = await request.post(
        "https://automationexercise.com/api/createAccount",
        {
          form: {
            name: userData.name,
            email: userData.email,
            password: userData.password,
            title: userData.title,
            birth_date: userData.birth_date,
            birth_month: userData.birth_month,
            birth_year: userData.birth_year,
            firstname: userData.firstname,
            lastname: userData.lastname,
            company: userData.company,
            address1: userData.address1,
            address2: userData.address2,
            country: userData.country,
            zipcode: userData.zipcode,
            state: userData.state,
            city: userData.city,
            mobile_number: userData.mobile_number,
          },
        },
      );

      console.log(await resp.json());
      console.log(userData);

      const responseCheck = await request.get(`https://automationexercise.com/api/getUserDetailByEmail?email=${userData.email}`);
      const respCheckJsonBody = await responseCheck.json();
      email = respCheckJsonBody.user.email;
      pwd = userData.password;

      console.log(await responseCheck.json());
      console.log(respCheckJsonBody);
      console.log(email);
      console.log(pwd);

    })
    await test.step('', async () => {
    })
  });

  test("User can login  with created credentials", async ({ page }) => {
    let emailTB: Locator = page
      .locator("form")
      .filter({ hasText: "Login" })
      .getByPlaceholder("Email Address");
    let pwdTb: Locator = page.getByRole("textbox", { name: "Password" });
    let loginLink: Locator = page.getByRole("link", { name: "Signup / Login" });
    let logoutLink: Locator = page.getByRole("link", { name: "Logout" });
    let loginBt: Locator = page.getByRole("button", { name: "Login" });

    await test.step('When I go to page', async () => {
      await page.goto(burl);
    })


    await test.step('When I click Login link', async () => {
      // Click the get started link.
      loginLink.click();
    })

    await test.step('Then I expect page to have title', async () => {
      // Expects page to have a heading with the name of Installation.
      await expect(page).toHaveTitle("Automation Exercise - Signup / Login");
    })

    await test.step('Then I expect to see user and password textbox', async () => {
      await expect(emailTB).toBeVisible;
      await expect(pwdTb).toBeVisible;
    })

    await test.step('When I enter credential and click Login button', async () => {
      await emailTB.fill(email);
      await pwdTb.fill(pwd);
      await loginBt.click();
    })

    await test.step('Then I expect to see Logout link', async () => {
      await expect(logoutLink).toBeVisible();
    })

    await page.close();
  });
});
