import { expect } from '@playwright/test';

export class CustomerLoginPage {
    constructor(page) {
        this.page = page;
        this.customerDropDown = page.locator('#userSelect');
        this.loginButton = page.locator('button[type="submit"]');
    }

    async open() {
        await this.page.goto(
            'https://www.globalsqa.com/angularJs-protractor/BankingProject/#/customer'
        );

        await this.customerDropDown.waitFor({
            state: 'visible',
            timeout: 15000
        });
    }

    async assertSelectCustomerDropdownIsVisible() {
        await expect(this.customerDropDown).toBeVisible({ timeout: 15000 });
    }

    async selectCustomer(customerName) {
        // Ждём появления списка клиентов
        await this.customerDropDown.waitFor({
            state: 'visible',
            timeout: 15000
        });

        // Ждём, пока в списке появится нужный клиент
        await this.page.waitForFunction(
            (name) => {
                const select = document.querySelector('#userSelect');

                if (!select) {
                    return false;
                }

                return Array.from(select.options).some(
                    option => option.textContent.trim() === name
                );
            },
            customerName,
            { timeout: 15000 }
        );

        // Выбираем клиента
        await this.customerDropDown.selectOption({
            label: customerName
        });
    }

    async clickLoginButton() {
        await this.loginButton.waitFor({
            state: 'visible',
            timeout: 10000
        });

        await this.loginButton.click();
    }

    async loginAs(customerName) {
        await this.selectCustomer(customerName);
        await this.clickLoginButton();
    }
}