import { test, expect } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage.js';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage.js';

test('Assert manager can add new customer', async ({ page }) => {
    const bankHomePage = new BankHomePage(page);
    const addCustomerPage = new AddCustomerPage(page);

    // Обработчик закрывает алерт сам и запоминает его текст
    let dialogMessage = '';
    page.once('dialog', async (dialog) => {
        dialogMessage = dialog.message();
        await dialog.accept();
    });

    await bankHomePage.open();
    await bankHomePage.clickManagerLoginButton();

    await addCustomerPage.openAddCustomerForm();
    await addCustomerPage.fillFirstName('John');
    await addCustomerPage.fillLastName('Doe');
    await addCustomerPage.fillPostCode('12345');
    await addCustomerPage.clickAddCustomerButton();

    // Проверяем текст алерта уже после клика
    expect(dialogMessage).toContain('Customer added successfully');
});