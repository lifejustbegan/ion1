import { element, by, ElementFinder } from 'protractor';

export class ScheduleComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-schedule div table .btn-danger'));
    title = element.all(by.css('jhi-schedule div h2#page-heading span')).first();

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

export class ScheduleUpdatePage {
    pageTitle = element(by.id('jhi-schedule-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    scheduleNameInput = element(by.id('field_scheduleName'));
    shiftStartTimeInput = element(by.id('field_shiftStartTime'));
    businessSelect = element(by.id('field_business'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setScheduleNameInput(scheduleName) {
        await this.scheduleNameInput.sendKeys(scheduleName);
    }

    async getScheduleNameInput() {
        return this.scheduleNameInput.getAttribute('value');
    }

    async setShiftStartTimeInput(shiftStartTime) {
        await this.shiftStartTimeInput.sendKeys(shiftStartTime);
    }

    async getShiftStartTimeInput() {
        return this.shiftStartTimeInput.getAttribute('value');
    }

    async businessSelectLastOption() {
        await this.businessSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async businessSelectOption(option) {
        await this.businessSelect.sendKeys(option);
    }

    getBusinessSelect(): ElementFinder {
        return this.businessSelect;
    }

    async getBusinessSelectedOption() {
        return this.businessSelect.element(by.css('option:checked')).getText();
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

export class ScheduleDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-schedule-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-schedule'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
