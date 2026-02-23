import { expect, test, type Page, type Locator } from '@playwright/test';
import { RegisterPage } from '../../src/pages/auth/registerPage';
import { SingInPage } from '../../src/pages/auth/singInPage';

let registerPage: RegisterPage;
let signInPage: SingInPage;
test.beforeEach('Goto Registration Page before every test', async ({ page }) => {
  registerPage = new RegisterPage(page);
  signInPage = new SingInPage(page);

  await registerPage.goto();
});

test.describe('Registration', { tag: '@registration' }, () => {
  test('New Registration', async ({ page }) => {
    const user = await registerPage.newRegistration('2002-11-25', 'Test Street', '123456', 'Test City', 'test State', 'India');

    await registerPage.registerButton.click();
    await expect(page).toHaveURL(/login/i);
    await page.waitForLoadState('load');

    await signInPage.fillsignInDetails(user.email, user.password);
    await signInPage.loginButton.click();
    await expect(page).toHaveURL(/account/i);
  });
});

test.describe('Regression Cases', { tag: '@regression' }, () => {
  test('Error Validations', async ({ page }) => {
    await registerPage.registerButton.click();
    await expect(registerPage.firstNameIsRequired).toBeVisible();
    await expect(registerPage.lastNameIsRequired).toBeVisible();
    await expect(registerPage.dobError).toBeVisible();
    await expect(registerPage.streetRequired).toBeVisible();
    await expect(registerPage.postalCodeRequired).toBeVisible();
    await expect(registerPage.cityRequired).toBeVisible();
    await expect(registerPage.stateRequired).toBeVisible();
    await expect(registerPage.countryRequired).toBeVisible();
    await expect(registerPage.phoneRequired).toBeVisible();
    await expect(registerPage.emailRequired).toBeVisible();
    await expect(registerPage.passwordErrorValidation).toBeVisible();
  });
});
