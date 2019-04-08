import { element, by, ElementFinder } from 'protractor';

export class IngredientsComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-ingredients div table .btn-danger'));
    title = element.all(by.css('jhi-ingredients div h2#page-heading span')).first();

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

export class IngredientsUpdatePage {
    pageTitle = element(by.id('jhi-ingredients-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    ingredientNameInput = element(by.id('field_ingredientName'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setIngredientNameInput(ingredientName) {
        await this.ingredientNameInput.sendKeys(ingredientName);
    }

    async getIngredientNameInput() {
        return this.ingredientNameInput.getAttribute('value');
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

export class IngredientsDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-ingredients-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-ingredients'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
