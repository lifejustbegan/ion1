import { element, by, ElementFinder } from 'protractor';

export class CustomerReviwesComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-customer-reviwes div table .btn-danger'));
    title = element.all(by.css('jhi-customer-reviwes div h2#page-heading span')).first();

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

export class CustomerReviwesUpdatePage {
    pageTitle = element(by.id('jhi-customer-reviwes-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    reviewInput = element(by.id('field_review'));
    createdDateInput = element(by.id('field_createdDate'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setReviewInput(review) {
        await this.reviewInput.sendKeys(review);
    }

    async getReviewInput() {
        return this.reviewInput.getAttribute('value');
    }

    async setCreatedDateInput(createdDate) {
        await this.createdDateInput.sendKeys(createdDate);
    }

    async getCreatedDateInput() {
        return this.createdDateInput.getAttribute('value');
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

export class CustomerReviwesDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-customerReviwes-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-customerReviwes'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
