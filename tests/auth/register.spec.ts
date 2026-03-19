import { test, expect } from '../../tests/fixtures/fixtures.ts';

test.beforeEach('Goto Registration Page before every test', async ({ page, pages }) => {
  await pages.registerPage.goto();
});

test.describe('Registration', { tag: '@register' }, () => {
  test('New Registration', async ({ page, pages }) => {
    const user = await pages.registerPage.newRegistration('2002-11-25', 'Test Street', '123456', 'Test City', 'test State', 'India');
    await pages.registerPage.registerButton.click();
    await expect(page).toHaveURL(/login/i);
    await page.waitForLoadState('load');
    await pages.signInPage.fillsignInDetails(user.email, user.password);
    await pages.signInPage.loginButton.click();
    await expect(page).toHaveURL(/account/i);
  });
});

test.describe('Regression Cases', { tag: '@regression' }, () => {
  test('Error Validations', async ({ page, pages }) => {
    await pages.registerPage.registerButton.click();
    await expect(pages.registerPage.firstNameIsRequired).toBeVisible();
    await expect(pages.registerPage.lastNameIsRequired).toBeVisible();
    await expect(pages.registerPage.dobError).toBeVisible();
    await expect(pages.registerPage.streetRequired).toBeVisible();
    await expect(pages.registerPage.postalCodeRequired).toBeVisible();
    await expect(pages.registerPage.cityRequired).toBeVisible();
    await expect(pages.registerPage.stateRequired).toBeVisible();
    await expect(pages.registerPage.countryRequired).toBeVisible();
    await expect(pages.registerPage.phoneRequired).toBeVisible();
    await expect(pages.registerPage.emailRequired).toBeVisible();
    await expect(pages.registerPage.passwordErrorValidation).toBeVisible();
  });
});
