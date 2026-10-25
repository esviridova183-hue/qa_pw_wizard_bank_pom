import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { BankHomePage } from '../../../src/pages/BankHomePage';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const postCode = faker.location.zipCode('#####');

test.beforeEach(async ({ page }) => {
  const bankHomePage = new BankHomePage(page);
  const addCustomerPage = new AddCustomerPage(page);

  page.once('dialog', async (dialog) => {
    await dialog.accept();
  });

  await bankHomePage.open();
  await bankHomePage.clickManagerLoginButton();

  await addCustomerPage.openAddCustomerForm();
  await addCustomerPage.fillFirstName(firstName);
  await addCustomerPage.fillLastName(lastName);
  await addCustomerPage.fillPostCode(postCode);
  await addCustomerPage.clickAddCustomerButton();
});

test('Assert manager can delete customer', async ({ page }) => {
  const customersListPage = new CustomersListPage(page);

  await customersListPage.openCustomersList();
  await customersListPage.assertCustomerIsInList(firstName, lastName);

  await customersListPage.deleteCustomer(firstName, lastName);

  await customersListPage.assertCustomerIsNotInList(firstName, lastName);
});