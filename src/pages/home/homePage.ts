import { expect, type Page, type Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly signInLink: Locator;
  readonly allProductNamesOnFirstPage: Locator;
  readonly sortOptions: Locator;
  readonly productPrices: Locator;

  constructor(page: Page) {
    this.page = page;

    //Locators
    this.signInLink = this.page.getByRole('link', { name: 'Sign In' });
    this.allProductNamesOnFirstPage = this.page.locator('.card-title');
    this.sortOptions = this.page.getByLabel('sort');
    this.productPrices = this.page.locator('[data-test="product-price"]');
  }

  async selectInSorting(sortingMethod: string) {
    await this.sortOptions.selectOption(sortingMethod);
    await this.page.waitForLoadState('networkidle');
  }

  async isNameAscending() {
    await this.selectInSorting('name,asc');
    const names = (await this.allProductNamesOnFirstPage.allTextContents()).map((n) => n.trim());
    const sorted = [...names].sort((a, b) => a.localeCompare(b));
    expect(names).toEqual(sorted);
  }

  async isNameDescending() {
    await this.selectInSorting('name,desc');
    const names = (await this.allProductNamesOnFirstPage.allTextContents()).map((n) => n.trim());
    const sorted = [...names].sort((a, b) => a.localeCompare(b)).reverse();
    expect(names).toEqual(sorted);
  }

  async IsHighToLowPrice() {
    await this.selectInSorting('price,desc');
    const allPrices = (await this.productPrices.allTextContents()).map((n) => n.trim());
    const sorted = [...allPrices].sort((a, b) => a.localeCompare(b)).reverse();
    expect(allPrices).toEqual(sorted);
  }

  async IsLowToHighPrice() {
    await this.selectInSorting('price,asc');
    const allPrices = (await this.productPrices.allTextContents()).map((n) => n.trim());
    const sorted = [...allPrices].sort((a, b) => a.localeCompare(b));
    expect(allPrices).toEqual(sorted);
  }

  async goto() {
    await this.page.goto('https://practicesoftwaretesting.com/');
  }
}
