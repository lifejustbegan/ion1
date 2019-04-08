import { element, by, ElementFinder } from 'protractor';

export class TablesComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-tables div table .btn-danger'));
    title = element.all(by.css('jhi-tables div h2#page-heading span')).first();

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

export class TablesUpdatePage {
    pageTitle = element(by.id('jhi-tables-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    tableNameInput = element(by.id('field_tableName'));
    tableNumberInput = element(by.id('field_tableNumber'));
    descriptionInput = element(by.id('field_description'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setTableNameInput(tableName) {
        await this.tableNameInput.sendKeys(tableName);
    }

    async getTableNameInput() {
        return this.tableNameInput.getAttribute('value');
    }

    async setTableNumberInput(tableNumber) {
        await this.tableNumberInput.sendKeys(tableNumber);
    }

    async getTableNumberInput() {
        return this.tableNumberInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
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

export class TablesDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-tables-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-tables'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
