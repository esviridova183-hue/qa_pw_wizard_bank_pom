import { test, expect } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage';

test('Assert the deposit can be opened', async ({ page }) => {
  const bankHomePage = new BankHomePage(page);
  const customerLoginPage = new CustomerLoginPage(page);
  const accountPage = new CustomerAccountPage(page);

  await bankHomePage.open();
  await bankHomePage.clickCustomerLoginButton();

  await customerLoginPage.selectCustomer('Harry Potter');
  await customerLoginPage.clickLoginButton();

  await accountPage.clickDepositButton();
  await accountPage.fillAmountInputField('100');
  // Исправлено на правильное имя метода из page object
  await accountPage.clickDepositFormButton();
  // Исправлено на правильное имя метода из page object
  await accountPage.assertDepositSuccessfulMessageIsVisible();
});