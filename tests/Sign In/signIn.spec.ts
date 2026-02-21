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
});

test('Sign in', async ({ page }) => {
  await homePage.signInLink.click();
  const fillLastUser = await signInPage.lastUserData();
  await signInPage.fillsignInDetails(fillLastUser.email, fillLastUser.password);
  await signInPage.loginButton.click();
  await expect(page).toHaveURL(/account/i);
});

test('Passsword Error Checks', async ({ page }) => {});
