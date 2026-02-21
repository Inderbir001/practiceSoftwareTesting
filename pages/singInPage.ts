import { expect, type Locator, type Page } from '@playwright/test';
import fs from 'fs';

export class SingInPage {
  readonly page: Page;

  //Locators
  readonly registerYourAccount: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly invalidEmailPasswordError: Locator;

  constructor(page: Page) {
    this.page = page;

    //Locators
    this.registerYourAccount = this.page.getByRole('link', { name: 'Register your account' });
    this.email = this.page.getByPlaceholder('Your email');
    this.password = this.page.getByPlaceholder('Your password');
    this.loginButton = this.page.getByRole('button', { name: 'Login' });
    this.invalidEmailPasswordError = this.page.getByAltText('Invalid email or password');
  }

  //actions

  async lastUserData() {
    const users = JSON.parse(fs.readFileSync('./test-data/users.json', 'utf8'));
    if (users.length === 0) {
      throw new Error('No Users found');
    }
    const lastUser = users[users.length - 1];
    return lastUser;
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
