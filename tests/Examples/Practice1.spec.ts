import { test, expect, request, Locator } from "@playwright/test";
import { faker } from "@faker-js/faker";

const burl: string = "https://automationexercise.com";

test("Page has title", async ({ page }) => {
  await page.goto(burl);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("Automation Exercise");
});

test("Endpoint can create a new user", async ({ request }) => {
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

  console.log(userData);
  console.log(await resp.json());
});

test("Login with created credentials", async ({ page }) => {
  await page.goto(burl);

  let emailTB: Locator = page
    .locator("form")
    .filter({ hasText: "Login" })
    .getByPlaceholder("Email Address");
  let pwdTB: Locator = page.getByRole("textbox", { name: "Password" });
  let loginBt: Locator = page.getByRole("button", { name: "Login" });
  let LogoutBt: Locator = page.getByRole("link", { name: "Logout" });

  // Click the get started link.
  await page.getByRole("link", { name: " Signup / Login" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page).toHaveTitle("Automation Exercise - Signup / Login");

  await expect(emailTB).toBeVisible;
  await expect(pwdTB).toBeVisible;

  await emailTB.fill("Briana_Satterfield18@yahoo.com");
  await pwdTB.fill("LyipDLFUuircCLh");
  await loginBt.click();

  await expect(LogoutBt).toBeVisible();

  await page.close();
});
