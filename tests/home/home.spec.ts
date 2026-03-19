import { test, expect } from '../../tests/fixtures/fixtures.ts';

test.beforeEach('Goto Sign In page before all tests', async ({ pages }) => {
  await pages.homePage.goto();
});

test.describe('Home Page Regression Cases', { tag: '@regression' }, () => {
  test('Sorted: Product Name Ascending', async ({ pages }) => {
    await pages.homePage.verifyNameAscending();
  });

  test('Sorted: Product Name Descending', async ({ pages }) => {
    await pages.homePage.verifyNameDescending();
  });

  test('Sorted : Price High to Low', async ({ pages }) => {
    await pages.homePage.verifyPriceHighToLow();
  });

  test('Sorted : Price Low to High', async ({ pages }) => {
    await pages.homePage.verifyPriceLowToHigh();
  });

  test('Sorted : CO2 Rating A - E ', async ({ pages }) => {
    await pages.homePage.verifyCO2Ascending();
  });

  test('Sorted : CO2 Rating E - A ', async ({ pages }) => {
    await pages.homePage.verifyCO2Descending();
  });
});
