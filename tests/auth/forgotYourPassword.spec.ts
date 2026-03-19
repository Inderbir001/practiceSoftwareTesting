import { test, expect } from '../../tests/fixtures/fixtures.ts';

test.describe('Forgot Your password Regression Cases', { tag: '@regression' }, () => {
  test.beforeEach('Goto Sign In page before all tests', async ({ page, pages }) => {
    await pages.signInPage.goto();
    await page.waitForLoadState('domcontentloaded');
    await pages.homePage.signInLink.click();
  });

  test('Successful message', async ({ page, pages }) => {
    await pages.signInPage.forgotYourPassword.click();
    await expect(page).toHaveURL(/forgot-password/i);
    const lastUserData = await pages.basePage.lastUserData();
    await pages.forgotPassword.yourEmail.fill(lastUserData.email);
    await pages.forgotPassword.setNewPassword.click();
    await expect(pages.forgotPassword.successfulMessage).toBeVisible();
  });

  test('Incorrect Email', async ({ page, pages }) => {
    await pages.signInPage.forgotYourPassword.click();
    await expect(page).toHaveURL(/forgot-password/i);
    await pages.forgotPassword.yourEmail.fill('email@gmail.com');
    await pages.forgotPassword.setNewPassword.click();
    await expect(pages.forgotPassword.invalidEmailError).toBeVisible();
  });
});
