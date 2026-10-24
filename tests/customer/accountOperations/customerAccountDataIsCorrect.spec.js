import { test, expect } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage';

test('Assert customer has correct bank data', async ({ page }) => {
  const bankHomePage = new BankHomePage(page);
  const customerLoginPage = new CustomerLoginPage(page);
  const accountPage = new CustomerAccountPage(page);

  await bankHomePage.open();
  await bankHomePage.clickCustomerLoginButton();

  // Явно дожидаемся загрузки страницы логина клиента
  await customerLoginPage.assertSelectCustomerDropdownIsVisible();

  // На сайте имя написано с опечаткой: Hermoine, а не Hermione
  await customerLoginPage.selectCustomer('Hermoine Granger');
  await customerLoginPage.clickLoginButton();

  // Значение в select хранится в формате Angular: "number:1001"
  await accountPage.assertAccountIdInDropDownHasValue('number:1001');
  await accountPage.assertAccountLineContainsText('1001');
});