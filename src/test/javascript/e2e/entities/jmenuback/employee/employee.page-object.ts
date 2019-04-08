import { element, by, ElementFinder } from 'protractor';

export class EmployeeComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-employee div table .btn-danger'));
    title = element.all(by.css('jhi-employee div h2#page-heading span')).first();

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

export class EmployeeUpdatePage {
    pageTitle = element(by.id('jhi-employee-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    firstNameInput = element(by.id('field_firstName'));
    lastNameInput = element(by.id('field_lastName'));
    middleNameInput = element(by.id('field_middleName'));
    dobInput = element(by.id('field_dob'));
    jobTitleSelect = element(by.id('field_jobTitle'));
    emailInput = element(by.id('field_email'));
    phoneNumberInput = element(by.id('field_phoneNumber'));
    hireDateInput = element(by.id('field_hireDate'));
    salaryInput = element(by.id('field_salary'));
    hourlyRateInput = element(by.id('field_hourlyRate'));
    tipInput = element(by.id('field_tip'));
    statusInput = element(by.id('field_status'));
    scheduleSelect = element(by.id('field_schedule'));
    businessSelect = element(by.id('field_business'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setFirstNameInput(firstName) {
        await this.firstNameInput.sendKeys(firstName);
    }

    async getFirstNameInput() {
        return this.firstNameInput.getAttribute('value');
    }

    async setLastNameInput(lastName) {
        await this.lastNameInput.sendKeys(lastName);
    }

    async getLastNameInput() {
        return this.lastNameInput.getAttribute('value');
    }

    async setMiddleNameInput(middleName) {
        await this.middleNameInput.sendKeys(middleName);
    }

    async getMiddleNameInput() {
        return this.middleNameInput.getAttribute('value');
    }

    async setDobInput(dob) {
        await this.dobInput.sendKeys(dob);
    }

    async getDobInput() {
        return this.dobInput.getAttribute('value');
    }

    async setJobTitleSelect(jobTitle) {
        await this.jobTitleSelect.sendKeys(jobTitle);
    }

    async getJobTitleSelect() {
        return this.jobTitleSelect.element(by.css('option:checked')).getText();
    }

    async jobTitleSelectLastOption() {
        await this.jobTitleSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setEmailInput(email) {
        await this.emailInput.sendKeys(email);
    }

    async getEmailInput() {
        return this.emailInput.getAttribute('value');
    }

    async setPhoneNumberInput(phoneNumber) {
        await this.phoneNumberInput.sendKeys(phoneNumber);
    }

    async getPhoneNumberInput() {
        return this.phoneNumberInput.getAttribute('value');
    }

    async setHireDateInput(hireDate) {
        await this.hireDateInput.sendKeys(hireDate);
    }

    async getHireDateInput() {
        return this.hireDateInput.getAttribute('value');
    }

    async setSalaryInput(salary) {
        await this.salaryInput.sendKeys(salary);
    }

    async getSalaryInput() {
        return this.salaryInput.getAttribute('value');
    }

    async setHourlyRateInput(hourlyRate) {
        await this.hourlyRateInput.sendKeys(hourlyRate);
    }

    async getHourlyRateInput() {
        return this.hourlyRateInput.getAttribute('value');
    }

    async setTipInput(tip) {
        await this.tipInput.sendKeys(tip);
    }

    async getTipInput() {
        return this.tipInput.getAttribute('value');
    }

    async setStatusInput(status) {
        await this.statusInput.sendKeys(status);
    }

    async getStatusInput() {
        return this.statusInput.getAttribute('value');
    }

    async scheduleSelectLastOption() {
        await this.scheduleSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async scheduleSelectOption(option) {
        await this.scheduleSelect.sendKeys(option);
    }

    getScheduleSelect(): ElementFinder {
        return this.scheduleSelect;
    }

    async getScheduleSelectedOption() {
        return this.scheduleSelect.element(by.css('option:checked')).getText();
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

export class EmployeeDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-employee-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-employee'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
