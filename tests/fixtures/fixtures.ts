import { test as base } from '@playwright/test';
import { ForgotYourPassword } from '../../src/pages/auth/forgotPassword';
import { RegisterPage } from '../../src/pages/auth/registerPage';
import { SignInPage } from '../../src/pages/auth/signInPage';
import { BasePage } from '../../src/pages/base/basePage';
import { HomePage } from '../../src/pages/home/homePage';

type Pages = {
  forgotPassword: ForgotYourPassword;
  registerPage: RegisterPage;
  signInPage: SignInPage;
  basePage: BasePage;
  homePage: HomePage;
};

type MyFixtures = {
  pages: Pages;
};

export const test = base.extend<MyFixtures>({
  pages: async ({ page }, use) => {
    const pages: Pages = {
      forgotPassword: new ForgotYourPassword(page),
      registerPage: new RegisterPage(page),
      signInPage: new SignInPage(page),
      basePage: new BasePage(page),
      homePage: new HomePage(page),
    };
    await use(pages);
  },
});

export { expect } from '@playwright/test';
