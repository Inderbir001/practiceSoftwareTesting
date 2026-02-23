import { test, type Locator, expect, type Page } from '@playwright/test';

export class ForgotYourPassword {
  readonly page: Page;

  //Locators
  readonly yourEmail: Locator;
  readonly setNewPassword: Locator;
  readonly successfulMessage: Locator;
  readonly invalidEmailError: Locator;

  constructor(page: Page) {
    this.page = page;

    //Locators
    this.yourEmail = this.page.getByPlaceholder('Your email *');
    this.setNewPassword = this.page.getByRole('button', { name: 'Set new Password' });
    this.successfulMessage = this.page.getByText('Your password is successfully updated!');
    this.invalidEmailError = this.page.getByText('The selected email is invalid. ');
  }
}
