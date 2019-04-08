import { element, by, ElementFinder } from 'protractor';

export class OrderCommentComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-order-comment div table .btn-danger'));
    title = element.all(by.css('jhi-order-comment div h2#page-heading span')).first();

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

export class OrderCommentUpdatePage {
    pageTitle = element(by.id('jhi-order-comment-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    ordCommentInput = element(by.id('field_ordComment'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setOrdCommentInput(ordComment) {
        await this.ordCommentInput.sendKeys(ordComment);
    }

    async getOrdCommentInput() {
        return this.ordCommentInput.getAttribute('value');
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

export class OrderCommentDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-orderComment-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-orderComment'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
