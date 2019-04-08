import { element, by, ElementFinder } from 'protractor';

export class HappyHourComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-happy-hour div table .btn-danger'));
    title = element.all(by.css('jhi-happy-hour div h2#page-heading span')).first();

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

export class HappyHourUpdatePage {
    pageTitle = element(by.id('jhi-happy-hour-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    newPriceInput = element(by.id('field_newPrice'));
    byCategorieInput = element(by.id('field_byCategorie'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNewPriceInput(newPrice) {
        await this.newPriceInput.sendKeys(newPrice);
    }

    async getNewPriceInput() {
        return this.newPriceInput.getAttribute('value');
    }

    async setByCategorieInput(byCategorie) {
        await this.byCategorieInput.sendKeys(byCategorie);
    }

    async getByCategorieInput() {
        return this.byCategorieInput.getAttribute('value');
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

export class HappyHourDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-happyHour-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-happyHour'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
