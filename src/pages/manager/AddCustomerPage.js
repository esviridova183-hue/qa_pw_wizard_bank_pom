import { expect } from '@playwright/test';

export class AddCustomerPage {
    constructor(page) {
        this.page = page;

        // Вкладка "Add Customer" в панели менеджера
        this.addCustomerTab = page.locator('button[ng-click="addCust()"]');

        // Поля формы
        this.firstNameInput = page.locator('input[ng-model="fName"]');
        this.lastNameInput = page.locator('input[ng-model="lName"]');
        this.postCodeInput = page.locator('input[ng-model="postCd"]');

        // Кнопка отправки формы (не путать с вкладкой выше)
        this.submitButton = page.locator('button[type="submit"]');
    }

    async openAddCustomerForm() {
        await this.addCustomerTab.click();
        await expect(this.firstNameInput).toBeVisible();
    }

    async fillFirstName(firstName) {
        await this.firstNameInput.fill(firstName);
    }

    async fillLastName(lastName) {
        await this.lastNameInput.fill(lastName);
    }

    async fillPostCode(postCode) {
        await this.postCodeInput.fill(postCode);
    }

    async clickAddCustomerButton() {
        await this.submitButton.click();
    }
}