import { Locator, Page } from '@playwright/test'
import { basePage } from './basePage';

export class homePage extends basePage {
    
    //LOCATORS
    emailTB: Locator;
    pwdTb: Locator;
    loginLink: Locator;
    logoutLink: Locator;
    loginBt: Locator;
    ImgLogo: Locator;


    constructor( page: Page) {
        //INHERITANCE
        super(page, "https://automationexercise.com/", "Automation Exercise");

        //this.emailTB = page.locator("form").filter({ hasText: "Login" }).getByPlaceholder("Email Address");
        this.emailTB=page.locator('//input [@data-qa="login-email"]')
        this.pwdTb = page.getByRole("textbox", { name: "Password" });
        this.loginLink = page.getByRole("link", { name: "Signup / Login" });
        this.logoutLink = page.getByRole("link", { name: "Logout" });
        this.loginBt = page.getByRole("button", { name: "Login" });
        this.ImgLogo=page.locator('//div [@class="logo pull-left"]');
    }
}