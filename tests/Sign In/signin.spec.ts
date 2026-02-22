import { test, expect } from '@playwright/test';
import { SingInPage } from '../../pages/singInPage';
import { HomePage } from '../../pages/homePage';
import { RegisterPage } from '../../pages/registerPage';

let signInPage: SingInPage;
let homePage: HomePage;
let registerPage: RegisterPage;

test.beforeEach('Goto Sign In page before all tests', async ({ page }) => {
  signInPage = new SingInPage(page);
  homePage = new HomePage(page);
  registerPage = new RegisterPage(page);

  //actions
  await signInPage.goto();
  await page.waitForLoadState('domcontentloaded');
  await homePage.signInLink.click();
});

test('Sign in', async ({ page }) => {
  const fillLastUser = await signInPage.lastUserData();
  await signInPage.fillsignInDetails(fillLastUser.email, fillLastUser.password);
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
