import { element, by, ElementFinder } from 'protractor';

export class PreDefinedOrderCommentsComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-pre-defined-order-comments div table .btn-danger'));
    title = element.all(by.css('jhi-pre-defined-order-comments div h2#page-heading span')).first();

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

export class PreDefinedOrderCommentsUpdatePage {
    pageTitle = element(by.id('jhi-pre-defined-order-comments-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    preCommentInput = element(by.id('field_preComment'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setPreCommentInput(preComment) {
        await this.preCommentInput.sendKeys(preComment);
    }

    async getPreCommentInput() {
        return this.preCommentInput.getAttribute('value');
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

export class PreDefinedOrderCommentsDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-preDefinedOrderComments-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-preDefinedOrderComments'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
