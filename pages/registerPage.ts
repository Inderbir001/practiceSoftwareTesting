import { expect, type Locator, type Page } from '@playwright/test';

export class Register {
  readonly page: Page;

  //Locators
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly yearOfBirth: Locator;
  readonly street: Locator;
  readonly postalCode: Locator;
  readonly city: Locator;
  readonly state: Locator;
  readonly country: Locator;
  readonly phone: Locator;
  readonly emailAddress: Locator;
  readonly password: Locator;
  readonly registerButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = this.page.locator('#first_name');
    this.lastName = this.page.locator('#last_name');
    this.yearOfBirth = this.page.locator('#dob');
    this.street = this.page.locator('#street');
    this.postalCode = this.page.locator('#postal_code');
    this.city = this.page.locator('#city');
    this.state = this.page.locator('#state');
    this.country = this.page.locator('#country');
    this.phone = this.page.locator('#phone');
    this.emailAddress = this.page.locator('#email');
    this.password = this.page.locator('#password');
    this.registerButton = this.page.getByRole('button', { name: 'Register' });
  }

  //Methods

  async newRegistration(
    fillFirstName: string,
    fillLastName: string,
    fillYearOfBirth: string,
    fillStreet: string,
    fillPostalCode: string,
    fillCity: string,
    fillState: string,
    selectCountry: string,
    fillPhone: string,
    fillEmail: string,
    fillPassword: string,
  ) {
    await this.firstName.fill(fillFirstName);
    await this.lastName.fill(fillLastName);
    await this.yearOfBirth.fill(fillYearOfBirth);
    await this.street.fill(fillStreet);
    await this.postalCode.fill(fillPostalCode);
    await this.city.fill(fillCity);
    await this.state.fill(fillState);
    await this.country.selectOption(selectCountry);
    await this.phone.fill(fillPhone);
    await this.emailAddress.fill(fillEmail);
    await this.password.fill(fillPassword);
  }

  async goto() {
    await this.page.goto('https://practicesoftwaretesting.com/auth/register');
  }
}
