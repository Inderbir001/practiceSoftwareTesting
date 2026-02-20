import { test, expect, type Locator } from '@playwright/test';
import { SingInPage } from '../../pages/singInPage';
import { HomePage } from '../../pages/homePage';
import { register } from 'node:module';

test('Sign in', async ({ page }) => {
  const signInPage = new SingInPage(page);
  const homePage = new HomePage(page);

  //actions
  await signInPage.goto();
  await page.waitForLoadState('domcontentloaded');
  await homePage.signInLink.click();
  await signInPage.fillsignInDetails('test@test.com', 'Tashan@1021');
  await signInPage.loginButton.click();
  await expect(page).toHaveURL(/account/i);
});
