import { expect, type Page, type Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly signInLink: Locator;
  readonly allProductNamesOnFirstPage: Locator;
  readonly sortOptions: Locator;
  readonly productPrices: Locator;
  readonly Co2Active: Locator;
  readonly nextButtonOuter: Locator;
  readonly nextButton: Locator;

  constructor(page: Page) {
    this.page = page;

    //Locators
    this.signInLink = this.page.getByRole('link', { name: 'Sign In' });
    this.allProductNamesOnFirstPage = this.page.locator('.card-title');
    this.sortOptions = this.page.getByLabel('sort');
    this.productPrices = this.page.locator('[data-test="product-price"]');
    this.Co2Active = this.page.locator('.co2-letter.active');
    this.nextButtonOuter = this.page.locator('.page-item');
    this.nextButton = this.page.getByRole('button', { name: 'Next' });
  }

  async selectInSorting(sortingMethod: string) {
    await this.sortOptions.selectOption(sortingMethod);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyCO2Descending() {
    await this.selectInSorting('co2_rating,desc');
    await this.page.waitForLoadState('networkidle');
    const nextPageItem = this.nextButtonOuter.filter({ has: this.nextButton });
    while (true) {
      const Co2Rating = (await this.Co2Active.allTextContents()).map((n) => n.trim());
      const sorted = [...Co2Rating].sort((a, b) => a.localeCompare(b)).reverse();
      expect(Co2Rating).toEqual(sorted);
      if ((await nextPageItem.getAttribute('class'))?.includes('disabled')) {
        break;
      }
      await Promise.all([this.page.waitForResponse((resp) => resp.url().includes('/products?page=') && resp.status() === 200), this.nextButton.click()]);
    }
  }

  async verifyCO2Ascending() {
    await this.selectInSorting('co2_rating,asc');
    await this.page.waitForLoadState('networkidle');
    const nextPageItem = this.nextButtonOuter.filter({ has: this.nextButton });
    while (true) {
      const Co2Rating = (await this.Co2Active.allTextContents()).map((n) => n.trim());
      const sorted = [...Co2Rating].sort((a, b) => a.localeCompare(b));
      expect(Co2Rating).toEqual(sorted);
      if ((await nextPageItem.getAttribute('class'))?.includes('disabled')) {
        break;
      }
      await Promise.all([this.page.waitForResponse((resp) => resp.url().includes('/products?page=') && resp.status() === 200), this.nextButton.click()]);
    }
  }

  async verifyNameAscending() {
    await this.selectInSorting('name,asc');
    await this.page.waitForLoadState('networkidle');
    const nextPageItem = this.nextButtonOuter.filter({ has: this.nextButton });
    while (true) {
      const names = (await this.allProductNamesOnFirstPage.allTextContents()).map((n) => n.trim());
      const sorted = [...names].sort((a, b) => a.localeCompare(b));
      expect(names).toEqual(sorted);
      if ((await nextPageItem.getAttribute('class'))?.includes('disabled')) {
        break;
      }
      await Promise.all([this.page.waitForResponse((resp) => resp.url().includes('/products?page=') && resp.status() === 200), this.nextButton.click()]);
    }
  }

  async verifyNameDescending() {
    await this.selectInSorting('name,desc');
    await this.page.waitForLoadState('networkidle');
    const nextPageItem = this.nextButtonOuter.filter({ has: this.nextButton });
    while (true) {
      const names = (await this.allProductNamesOnFirstPage.allTextContents()).map((n) => n.trim());
      const sorted = [...names].sort((a, b) => a.localeCompare(b)).reverse();
      expect(names).toEqual(sorted);
      if ((await nextPageItem.getAttribute('class'))?.includes('disabled')) {
        break;
      }
      await Promise.all([this.page.waitForResponse((resp) => resp.url().includes('/products?page=') && resp.status() === 200), this.nextButton.click()]);
    }
  }

  async verifyPriceHighToLow() {
    await this.selectInSorting('price,desc');
    await this.page.waitForLoadState('networkidle');
    const nextPageItem = this.nextButtonOuter.filter({ has: this.nextButton });
    while (true) {
      const allPrices = (await this.productPrices.allTextContents()).map((n) => parseFloat(n.replace('$', '').trim()));
      const sorted = [...allPrices].sort((a, b) => b - a);
      expect(allPrices).toEqual(sorted);
      if ((await nextPageItem.getAttribute('class'))?.includes('disabled')) {
        break;
      }
      await Promise.all([this.page.waitForResponse((resp) => resp.url().includes('/products?page=') && resp.status() === 200), this.nextButton.click()]);
    }
  }
  
  async verifyPriceLowToHigh() {
    await this.selectInSorting('price,asc');
    await this.page.waitForLoadState('networkidle');
    const nextPageItem = this.nextButtonOuter.filter({ has: this.nextButton });
    while (true) {
      const allPrices = (await this.productPrices.allTextContents()).map((n) => parseFloat(n.replace('$', '').trim()));
      const sorted = [...allPrices].sort((a, b) => a - b);
      expect(allPrices).toEqual(sorted);
      if ((await nextPageItem.getAttribute('class'))?.includes('disabled')) {
        break;
      }
      await Promise.all([this.page.waitForResponse((resp) => resp.url().includes('/products?page=') && resp.status() === 200), this.nextButton.click()]);
    }
  }

  async goto() {
    await this.page.goto('https://practicesoftwaretesting.com/');
  }
}
