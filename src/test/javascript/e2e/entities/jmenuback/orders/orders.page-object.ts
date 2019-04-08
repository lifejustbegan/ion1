import { element, by, ElementFinder } from 'protractor';

export class OrdersComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-orders div table .btn-danger'));
    title = element.all(by.css('jhi-orders div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class OrdersUpdatePage {
    pageTitle = element(by.id('jhi-orders-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    orderIDInput = element(by.id('field_orderID'));
    orderNameInput = element(by.id('field_orderName'));
    placedTimeInput = element(by.id('field_placedTime'));
    closedTimeInput = element(by.id('field_closedTime'));
    totalClosedInput = element(by.id('field_totalClosed'));
    orderStatusSelect = element(by.id('field_orderStatus'));
    employeeSelect = element(by.id('field_employee'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setOrderIDInput(orderID) {
        await this.orderIDInput.sendKeys(orderID);
    }

    async getOrderIDInput() {
        return this.orderIDInput.getAttribute('value');
    }

    async setOrderNameInput(orderName) {
        await this.orderNameInput.sendKeys(orderName);
    }

    async getOrderNameInput() {
        return this.orderNameInput.getAttribute('value');
    }

    async setPlacedTimeInput(placedTime) {
        await this.placedTimeInput.sendKeys(placedTime);
    }

    async getPlacedTimeInput() {
        return this.placedTimeInput.getAttribute('value');
    }

    async setClosedTimeInput(closedTime) {
        await this.closedTimeInput.sendKeys(closedTime);
    }

    async getClosedTimeInput() {
        return this.closedTimeInput.getAttribute('value');
    }

    async setTotalClosedInput(totalClosed) {
        await this.totalClosedInput.sendKeys(totalClosed);
    }

    async getTotalClosedInput() {
        return this.totalClosedInput.getAttribute('value');
    }

    async setOrderStatusSelect(orderStatus) {
        await this.orderStatusSelect.sendKeys(orderStatus);
    }

    async getOrderStatusSelect() {
        return this.orderStatusSelect.element(by.css('option:checked')).getText();
    }

    async orderStatusSelectLastOption() {
        await this.orderStatusSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async employeeSelectLastOption() {
        await this.employeeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async employeeSelectOption(option) {
        await this.employeeSelect.sendKeys(option);
    }

    getEmployeeSelect(): ElementFinder {
        return this.employeeSelect;
    }

    async getEmployeeSelectedOption() {
        return this.employeeSelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class OrdersDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-orders-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-orders'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
