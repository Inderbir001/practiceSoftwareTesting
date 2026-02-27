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

test.beforeEach('Goto Sign In page before all tests', async ({ page }) => {
  signInPage = new SingInPage(page);
  homePage = new HomePage(page);
  registerPage = new RegisterPage(page);
  forgotYourPasswordPage = new ForgotYourPassword(page);
  basePage = new BasePage(page);

  //actions
  await homePage.goto();
  await page.waitForLoadState('domcontentloaded');
});

test.describe('Home Page Regression Cases', { tag: '@regression' }, () => {
  test('Sorted: Product Name Ascending', async () => {
    await homePage.isNameAscending();
  });

  test('Sorted: Product Name Descending', async ({ page }) => {
    await homePage.isNameDescending();
  });

  test('Sorted : Price High to Low', async ({ page }) => {
    await homePage.IsHighToLowPrice();
  });

  test('Sorted : Price Low to High', async ({ page }) => {
    await homePage.IsLowToHighPrice();
  });

  test('Sorted : CO2 Rating A - E ', async ({ page }) => {
    await homePage.isCO2RatingAToE();
  });

  test('Sorted : CO2 Rating E -A ', async ({ page }) => {
    await homePage.isCO2RatingEToA();
  });
});
