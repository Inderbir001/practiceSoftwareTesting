import { test, expect, type Locator } from '@playwright/test';
import { SingInPage } from '../../pages/singInPage';
import { HomePage } from '../../pages/homePage';
import { RegisterPage } from '../../pages/registerPage';

test('Sign in', async ({ page }) => {
  const signInPage = new SingInPage(page);
  const homePage = new HomePage(page);
  const registerPage = new RegisterPage(page);

  //actions
  await signInPage.goto();
  await page.waitForLoadState('domcontentloaded');
  await homePage.signInLink.click();
  const fillLastUser = await signInPage.lastUserData();
  await signInPage.fillsignInDetails(fillLastUser.email, fillLastUser.password);
  await signInPage.loginButton.click();
  await expect(page).toHaveURL(/account/i);
});

// test('Passsword Error Checks', async ({ page }) => {

// });
