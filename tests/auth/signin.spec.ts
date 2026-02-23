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

test.describe('Sign in page Regression Cases', { tag: '@regression' }, () => {
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

  test('Sign in', async ({ page }) => {
    await signInPage.fillsignInDetails('customer2@practicesoftwaretesting.com', 'welcome01');
    await signInPage.loginButton.click();
    await expect(page).toHaveURL(/account/i);
  });

  test('Incorrect Password', async ({ page }) => {
    await signInPage.fillsignInDetails('test.email@gmail.com', 'Test@12345!');
    await signInPage.loginButton.click();
    await expect(signInPage.invalidEmailPasswordError).toBeVisible();
  });

  test('Password length invalid error', async ({ page }) => {
    await signInPage.fillsignInDetails('test.email@gmail.com', 'Te');
    await signInPage.loginButton.click();
    await expect(signInPage.passwordLengthIsInvalid).toBeVisible();
  });

  test('Email Format Invalid', async ({ page }) => {
    await signInPage.fillsignInDetails('tes', 'Test@123!');
    await signInPage.loginButton.click();
    await expect(signInPage.emailFormatIsInvalid).toBeVisible();
  });

  test('Eye Icon functionality', async ({ page }) => {
    await signInPage.fillsignInDetails('test.email@gmail.com', 'Test@12345!');
    await expect(signInPage.password).toHaveAttribute('type', 'password');
    await signInPage.eyeIcon.click();
    await expect(signInPage.password).toHaveAttribute('type', 'text');
  });
});
