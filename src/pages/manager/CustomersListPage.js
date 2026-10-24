import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.customersTab = page.locator('button[ng-click="showCust()"]');
    this.searchField = page.locator('input[ng-model="searchCustomer"]');
    this.tableRows = page.locator('table tbody tr');
  }

  getCustomerRow(firstName, lastName) {
    return this.tableRows
      .filter({ hasText: firstName })
      .filter({ hasText: lastName });
  }

  async openCustomersList() {
    await this.customersTab.click();
    await expect(this.tableRows.first()).toBeVisible();
  }

  async fillSearchField(text) {
    await this.searchField.fill(text);
  }

  async assertCustomerRowIsPresent(firstName, lastName) {
    await expect(this.getCustomerRow(firstName, lastName)).toHaveCount(1);
  }

  async assertNoOtherRowsArePresent() {
    await expect(this.tableRows).toHaveCount(1);
  }

  async assertCustomerIsInList(firstName, lastName) {
    await expect(this.getCustomerRow(firstName, lastName)).toHaveCount(1);
  }

  async deleteCustomer(firstName, lastName) {
    await this.getCustomerRow(firstName, lastName)
      .locator('button[ng-click="deleteCust(cust)"]')
      .click();
  }

  async assertCustomerIsNotInList(firstName, lastName) {
    await expect(this.getCustomerRow(firstName, lastName)).toHaveCount(0);
  }

  async assertLastCustomerHasAccountNumber() {
    const accountCell = this.tableRows.last().locator('td').nth(3);
    await expect(accountCell).not.toBeEmpty();
  }
}