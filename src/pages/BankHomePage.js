import { expect } from '@playwright/test';

export class BankHomePage {
  constructor(page) {
    this.page = page;
    this.customerLoginButton = page.getByRole('button', { name: 'Customer Login' });
    this.managerLoginButton = page.getByRole('button', { name: 'Bank Manager Login' });
  }

  async open() {
    await this.page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login');
  }

  async clickCustomerLoginButton() {
    await this.customerLoginButton.waitFor({ state: 'visible', timeout: 15000 });
    await this.customerLoginButton.click();
  }

  async clickManagerLoginButton() {
    await this.managerLoginButton.waitFor({ state: 'visible', timeout: 15000 });
    await this.managerLoginButton.click();
  }
}