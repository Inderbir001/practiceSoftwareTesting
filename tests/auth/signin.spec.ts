import { test, expect } from '../../tests/fixtures/fixtures.ts';

test.describe('Sign in page Regression Cases', { tag: '@regression' }, () => {
  test.beforeEach('Goto Sign In page before all tests', async ({ page, pages }) => {
    await pages.signInPage.goto();
    await page.waitForLoadState('domcontentloaded');
    await pages.homePage.signInLink.click();
  });

  test('Sign in', async ({ page, pages }) => {
    await pages.signInPage.fillsignInDetails('customer2@practicesoftwaretesting.com', 'welcome01');
    await pages.signInPage.loginButton.click();
    await expect(page).toHaveURL(/account/i);
  });

  test('Incorrect Password', async ({ page, pages }) => {
    await pages.signInPage.fillsignInDetails('test.email@gmail.com', 'Test@12345!');
    await pages.signInPage.loginButton.click();
    await expect(pages.signInPage.invalidEmailPasswordError).toBeVisible();
  });

  test('Password length invalid error', async ({ page, pages }) => {
    await pages.signInPage.fillsignInDetails('test.email@gmail.com', 'Te');
    await pages.signInPage.loginButton.click();
    await expect(pages.signInPage.passwordLengthIsInvalid).toBeVisible();
  });

  test('Email Format Invalid', async ({ page, pages }) => {
    await pages.signInPage.fillsignInDetails('tes', 'Test@123!');
    await pages.signInPage.loginButton.click();
    await expect(pages.signInPage.emailFormatIsInvalid).toBeVisible();
  });

  test('Eye Icon functionality', async ({ page, pages }) => {
    await pages.signInPage.fillsignInDetails('test.email@gmail.com', 'Test@12345!');
    await expect(pages.signInPage.password).toHaveAttribute('type', 'password');
    await pages.signInPage.eyeIcon.click();
    await expect(pages.signInPage.password).toHaveAttribute('type', 'text');
  });
});
