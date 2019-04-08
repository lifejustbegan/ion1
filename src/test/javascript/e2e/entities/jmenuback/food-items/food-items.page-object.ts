import { element, by, ElementFinder } from 'protractor';

export class FoodItemsComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-food-items div table .btn-danger'));
    title = element.all(by.css('jhi-food-items div h2#page-heading span')).first();

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

export class FoodItemsUpdatePage {
    pageTitle = element(by.id('jhi-food-items-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    itemNameInput = element(by.id('field_itemName'));
    descriptionInput = element(by.id('field_description'));
    priceInput = element(by.id('field_price'));
    caloriesInput = element(by.id('field_calories'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setItemNameInput(itemName) {
        await this.itemNameInput.sendKeys(itemName);
    }

    async getItemNameInput() {
        return this.itemNameInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async setPriceInput(price) {
        await this.priceInput.sendKeys(price);
    }

    async getPriceInput() {
        return this.priceInput.getAttribute('value');
    }

    async setCaloriesInput(calories) {
        await this.caloriesInput.sendKeys(calories);
    }

    async getCaloriesInput() {
        return this.caloriesInput.getAttribute('value');
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

export class FoodItemsDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-foodItems-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-foodItems'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
