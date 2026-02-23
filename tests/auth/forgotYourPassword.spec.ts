import { test, expect } from '@playwright/test';
import { SingInPage } from '../../src/pages/auth/singInPage';
import { HomePage } from '../../src/pages/home/homePage';
import { RegisterPage } from '../../src/pages/auth/registerPage';
import { ForgotYourPassword } from '../../src/pages/auth/forgotPassword';
import { BasePage } from '../../src/pages/base/basePage';

let signInPage: SingInPage;
let homePage: HomePage;
let registerPage: RegisterPage;
let forgotYourPasswordPage: ForgotYourPassword;
let basePage: BasePage;

test.describe('Forgot Your password Regression Cases', { tag: '@regression' }, () => {
  test.beforeEach('Goto Sign In page before all tests', async ({ page }) => {
    signInPage = new SingInPage(page);
    homePage = new HomePage(page);
    registerPage = new RegisterPage(page);
    forgotYourPasswordPage = new ForgotYourPassword(page);
    basePage = new BasePage(page);

    //actions
    await signInPage.goto();
    await page.waitForLoadState('domcontentloaded');
    await homePage.signInLink.click();
  });

  test('Successful message', async ({ page }) => {
    await signInPage.forgotYourPassword.click();
    await expect(page).toHaveURL(/forgot-password/i);
    const lastUserData = await basePage.lastUserData();
    await forgotYourPasswordPage.yourEmail.fill(lastUserData.email);
    await forgotYourPasswordPage.setNewPassword.click();
    await expect(forgotYourPasswordPage.successfulMessage).toBeVisible();
  });

  test('Incorrect Email', async ({ page }) => {
    await signInPage.forgotYourPassword.click();
    await expect(page).toHaveURL(/forgot-password/i);
    await forgotYourPasswordPage.yourEmail.fill('email@gmail.com');
    await forgotYourPasswordPage.setNewPassword.click();
    await expect(forgotYourPasswordPage.invalidEmailError).toBeVisible();
  });
});
