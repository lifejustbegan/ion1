import { element, by, ElementFinder } from 'protractor';

export class TimesheetComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-timesheet div table .btn-danger'));
    title = element.all(by.css('jhi-timesheet div h2#page-heading span')).first();

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

export class TimesheetUpdatePage {
    pageTitle = element(by.id('jhi-timesheet-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    dateTimeInput = element(by.id('field_dateTime'));
    punchInTimeInput = element(by.id('field_punchInTime'));
    punchOutTimeInput = element(by.id('field_punchOutTime'));
    breakTimeOutInput = element(by.id('field_breakTimeOut'));
    breakTimeInInput = element(by.id('field_breakTimeIn'));
    employeeSelect = element(by.id('field_employee'));
    businessSelect = element(by.id('field_business'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setDateTimeInput(dateTime) {
        await this.dateTimeInput.sendKeys(dateTime);
    }

    async getDateTimeInput() {
        return this.dateTimeInput.getAttribute('value');
    }

    async setPunchInTimeInput(punchInTime) {
        await this.punchInTimeInput.sendKeys(punchInTime);
    }

    async getPunchInTimeInput() {
        return this.punchInTimeInput.getAttribute('value');
    }

    async setPunchOutTimeInput(punchOutTime) {
        await this.punchOutTimeInput.sendKeys(punchOutTime);
    }

    async getPunchOutTimeInput() {
        return this.punchOutTimeInput.getAttribute('value');
    }

    async setBreakTimeOutInput(breakTimeOut) {
        await this.breakTimeOutInput.sendKeys(breakTimeOut);
    }

    async getBreakTimeOutInput() {
        return this.breakTimeOutInput.getAttribute('value');
    }

    async setBreakTimeInInput(breakTimeIn) {
        await this.breakTimeInInput.sendKeys(breakTimeIn);
    }

    async getBreakTimeInInput() {
        return this.breakTimeInInput.getAttribute('value');
    }

    async employeeSelectLastOption() {
        await this.employeeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async employeeSelectOption(option) {
        await this.employeeSelect.sendKeys(option);
    }

    getEmployeeSelect(): ElementFinder {
        return this.employeeSelect;
    }

    async getEmployeeSelectedOption() {
        return this.employeeSelect.element(by.css('option:checked')).getText();
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

export class TimesheetDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-timesheet-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-timesheet'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
