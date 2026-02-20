import { expect, test, type Page, type Locator } from '@playwright/test';
import { RegisterPage } from '../../pages/registerPage';
import { SingInPage } from '../../pages/singInPage';

test('New Registration', async ({ page }) => {
  const registerPage = new RegisterPage(page);
  const signInPage = new SingInPage(page);

  //actions
  await registerPage.goto();
  const user = await registerPage.newRegistration('2002-11-25', 'Test Street', '123456', 'Test City', 'test State', 'India');
  await registerPage.registerButton.click();
  await expect(page).toHaveURL(/login/i);
  await page.waitForLoadState('load');
  await signInPage.fillsignInDetails(user.email, user.password);
  await signInPage.loginButton.click();
  await expect(page).toHaveURL(/account/i);
});
