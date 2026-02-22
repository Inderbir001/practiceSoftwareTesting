import { expect, type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';
import fs from 'fs';

export class RegisterPage {
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

  randomPassword() {
    const letters = faker.string.alphanumeric(8);
    const special = faker.helpers.arrayElement(['@', '#', '$']);
    const number = faker.string.numeric(2);

    return letters + special + number;
  }

  async newRegistration(fillYearOfBirth: string, fillStreet: string, fillPostalCode: string, fillCity: string, fillState: string, selectCountry: string) {
    const randomPassword = this.randomPassword();
    const randomFirstName = faker.person.firstName();
    const randomLastName = faker.person.lastName();
    const randomPhoneNumber = faker.string.numeric(10);
    const randomEmail = faker.internet.email();

    await this.firstName.fill(randomFirstName);
    await this.lastName.fill(randomLastName);
    await this.yearOfBirth.fill(fillYearOfBirth);
    await this.street.fill(fillStreet);
    await this.postalCode.fill(fillPostalCode);
    await this.city.fill(fillCity);
    await this.state.fill(fillState);
    await this.country.selectOption(selectCountry);
    await this.phone.fill(randomPhoneNumber);
    await this.emailAddress.fill(randomEmail);
    await this.password.fill(randomPassword);

    const user = {
      email: randomEmail,
      password: randomPassword,
    };

    const filePath = './test-data/users.json';
    const users = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    users.push(user);

    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    return user;
  }

  async goto() {
    await this.page.goto('https://practicesoftwaretesting.com/auth/register');
  }
}
