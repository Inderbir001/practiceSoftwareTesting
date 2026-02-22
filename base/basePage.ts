import { test, type Page, type Locator, expect } from '@playwright/test';
import fs from 'fs';

export class BasePage {
  readonly page: Page;

  //Locators

  constructor(page: Page) {
    this.page = page;

    //Locators
  }

  async lastUserData() {
    const users = JSON.parse(fs.readFileSync('./test-data/users.json', 'utf8'));
    if (users.length === 0) {
      throw new Error('No Users found');
    }
    const lastUser = users[users.length - 1];
    return lastUser;
  }
}
