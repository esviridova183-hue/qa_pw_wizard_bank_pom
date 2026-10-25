import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { BankHomePage } from '../../../src/pages/BankHomePage';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';
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

  await page.reload();
});

test('Assert manager can open account for new customer', async ({ page }) => {
  const openAccountPage = new OpenAccountPage(page);
  const customersListPage = new CustomersListPage(page);

  page.once('dialog', async (dialog) => {
    await dialog.accept();
  });

  await openAccountPage.clickOpenAccountTab();
  await openAccountPage.selectCustomer(`${firstName} ${lastName}`);
  await openAccountPage.selectCurrency('Dollar');
  await openAccountPage.clickProcessButton();

  await page.reload();

  await customersListPage.openCustomersList();
  await customersListPage.assertLastCustomerHasAccountNumber();
});