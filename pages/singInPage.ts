import { expect, type Locator, type Page } from '@playwright/test';

export class SingInPage {
  readonly page: Page;
  readonly registerYourAccount: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.registerYourAccount = this.page.getByRole('link', { name: 'Register your account' });
    this.email = this.page.getByPlaceholder('Your email');
    this.password = this.page.getByPlaceholder('Your password');
    this.loginButton = this.page.getByRole('button', { name: 'Login' });
  }
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
