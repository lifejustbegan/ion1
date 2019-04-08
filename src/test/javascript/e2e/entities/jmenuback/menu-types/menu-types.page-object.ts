import { element, by, ElementFinder } from 'protractor';

export class MenuTypesComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-menu-types div table .btn-danger'));
    title = element.all(by.css('jhi-menu-types div h2#page-heading span')).first();

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

export class MenuTypesUpdatePage {
    pageTitle = element(by.id('jhi-menu-types-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    menuTypeNameInput = element(by.id('field_menuTypeName'));
    descriptionInput = element(by.id('field_description'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setMenuTypeNameInput(menuTypeName) {
        await this.menuTypeNameInput.sendKeys(menuTypeName);
    }

    async getMenuTypeNameInput() {
        return this.menuTypeNameInput.getAttribute('value');
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

export class MenuTypesDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-menuTypes-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-menuTypes'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
