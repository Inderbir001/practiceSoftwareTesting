import { test, expect } from '@playwright/test';
import { SingInPage } from '../../pages/sign_In_Page/singInPage';
import { HomePage } from '../../pages/homePage';
import { RegisterPage } from '../../pages/sign_In_Page/registerPage';
import { ForgotYourPassword } from '../../pages/sign_In_Page/forgotPassword';
import { BasePage } from '../../base/basePage';
import { base } from '@faker-js/faker';

let signInPage: SingInPage;
let homePage: HomePage;
let registerPage: RegisterPage;
let forgotYourPasswordPage: ForgotYourPassword;
let basePage: BasePage;

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
