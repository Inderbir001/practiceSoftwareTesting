import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from '../base/basePage';

export class SingInPage {
  readonly page: Page;
  readonly basePage: BasePage;

  //Locators
  readonly registerYourAccount: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly invalidEmailPasswordError: Locator;
  readonly passwordLengthIsInvalid: Locator;
  readonly emailFormatIsInvalid: Locator;
  readonly eyeIcon: Locator;
  readonly forgotYourPassword: Locator;

  constructor(page: Page) {
    this.page = page;
    this.basePage = new BasePage(page);

    //Locators
    this.registerYourAccount = this.page.getByRole('link', { name: 'Register your account' });
    this.email = this.page.getByPlaceholder('Your email');
    this.password = this.page.getByPlaceholder('Your password');
    this.loginButton = this.page.getByRole('button', { name: 'Login' });
    this.invalidEmailPasswordError = this.page.getByText('Invalid email or password');
    this.passwordLengthIsInvalid = this.page.getByText('Password length is invalid');
    this.emailFormatIsInvalid = this.page.getByText('Email format is invalid');
    this.eyeIcon = this.page.locator('button:has(svg[data-icon="eye"])');
    this.forgotYourPassword = this.page.getByText('Forgot your Password?');
  }

  //actions

  async fillsignInDetails(fillEmail: string, fillPassword: string) {
    await this.email.waitFor({ state: 'visible' });
    await this.email.fill(fillEmail);
    await this.password.waitFor({ state: 'visible' });
    await this.password.fill(fillPassword);
  }

  async goto() {
    await this.page.goto('https://practicesoftwaretesting.com/');
  }
}
