import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.openAccountTab = page.locator('button[ng-click="openAccount()"]');
    this.customerDropdown = page.locator('#userSelect');
    this.currencyDropdown = page.locator('#currency');
    this.processButton = page.locator('button[type="submit"]');
  }

  async open() {
    await this.page.goto(
      'https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/openAccount'
    );
    await expect(this.currencyDropdown).toBeVisible();
  }

  async clickOpenAccountTab() {
    await this.openAccountTab.click();
  }

  async selectCustomer(fullName) {
    await this.customerDropdown.selectOption({ label: fullName });
  }

  async selectCurrency(currency) {
    await this.currencyDropdown.selectOption({ label: currency });
  }

  async clickProcessButton() {
    await this.processButton.click();
  }

  async assertCurrencyDropdownHasValue(currency) {
    await expect(this.currencyDropdown).toHaveValue(currency);
  }
}