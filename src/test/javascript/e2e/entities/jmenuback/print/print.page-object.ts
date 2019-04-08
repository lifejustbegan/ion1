import { element, by, ElementFinder } from 'protractor';

export class PrintComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-print div table .btn-danger'));
    title = element.all(by.css('jhi-print div h2#page-heading span')).first();

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

export class PrintUpdatePage {
    pageTitle = element(by.id('jhi-print-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    orderIDInput = element(by.id('field_orderID'));
    totalInput = element(by.id('field_total'));
    printedTimeInput = element(by.id('field_printedTime'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setOrderIDInput(orderID) {
        await this.orderIDInput.sendKeys(orderID);
    }

    async getOrderIDInput() {
        return this.orderIDInput.getAttribute('value');
    }

    async setTotalInput(total) {
        await this.totalInput.sendKeys(total);
    }

    async getTotalInput() {
        return this.totalInput.getAttribute('value');
    }

    async setPrintedTimeInput(printedTime) {
        await this.printedTimeInput.sendKeys(printedTime);
    }

    async getPrintedTimeInput() {
        return this.printedTimeInput.getAttribute('value');
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

export class PrintDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-print-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-print'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
