import { expect, type Page, type Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly signInLink: Locator;

  constructor(page: Page) {
    this.page = page;

    //Locators
    this.signInLink = this.page.getByRole('link', { name: 'Sign In' });
  }
}
