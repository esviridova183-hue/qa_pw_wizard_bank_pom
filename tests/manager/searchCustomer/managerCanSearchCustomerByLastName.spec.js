import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { BankHomePage } from '../../../src/pages/BankHomePage';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let firstName;
let lastName;
let postalCode;

test.beforeEach(async ({ page }) => {
  const bankHomePage = new BankHomePage(page);
  const addCustomerPage = new AddCustomerPage(page);

  firstName = faker.person.firstName();
  // Добавляем случайные буквы, чтобы фамилия не совпала с демо-клиентами
  lastName = faker.person.lastName() + faker.string.alpha(6);
  postalCode = faker.location.zipCode();

  // Алерт после добавления клиента закрываем сами
  page.once('dialog', async (dialog) => {
    await dialog.accept();
  });

  await bankHomePage.open();
  await bankHomePage.clickManagerLoginButton();

  await addCustomerPage.openAddCustomerForm();
  await addCustomerPage.fillFirstName(firstName);
  await addCustomerPage.fillLastName(lastName);
  await addCustomerPage.fillPostCode(postalCode);
  await addCustomerPage.clickAddCustomerButton();
});

test('Assert manager can search customer by Last Name', async ({ page }) => {
  const customersListPage = new CustomersListPage(page);

  await customersListPage.openCustomersList();
  await customersListPage.fillSearchField(lastName);

  await customersListPage.assertCustomerRowIsPresent(firstName, lastName);
  await customersListPage.assertNoOtherRowsArePresent();
});