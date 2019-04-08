import { element, by, ElementFinder } from 'protractor';

export class CustomersComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-customers div table .btn-danger'));
    title = element.all(by.css('jhi-customers div h2#page-heading span')).first();

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

export class CustomersUpdatePage {
    pageTitle = element(by.id('jhi-customers-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    firstNameInput = element(by.id('field_firstName'));
    lastNameInput = element(by.id('field_lastName'));
    middleNameInput = element(by.id('field_middleName'));
    dobInput = element(by.id('field_dob'));
    emailInput = element(by.id('field_email'));
    cellNumberInput = element(by.id('field_cellNumber'));
    businessPhoneInput = element(by.id('field_businessPhone'));
    signupDateInput = element(by.id('field_signupDate'));
    membershipTypeInput = element(by.id('field_membershipType'));
    tipInput = element(by.id('field_tip'));
    jobTitleSelect = element(by.id('field_jobTitle'));
    statusInput = element(by.id('field_status'));

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

    async setEmailInput(email) {
        await this.emailInput.sendKeys(email);
    }

    async getEmailInput() {
        return this.emailInput.getAttribute('value');
    }

    async setCellNumberInput(cellNumber) {
        await this.cellNumberInput.sendKeys(cellNumber);
    }

    async getCellNumberInput() {
        return this.cellNumberInput.getAttribute('value');
    }

    async setBusinessPhoneInput(businessPhone) {
        await this.businessPhoneInput.sendKeys(businessPhone);
    }

    async getBusinessPhoneInput() {
        return this.businessPhoneInput.getAttribute('value');
    }

    async setSignupDateInput(signupDate) {
        await this.signupDateInput.sendKeys(signupDate);
    }

    async getSignupDateInput() {
        return this.signupDateInput.getAttribute('value');
    }

    async setMembershipTypeInput(membershipType) {
        await this.membershipTypeInput.sendKeys(membershipType);
    }

    async getMembershipTypeInput() {
        return this.membershipTypeInput.getAttribute('value');
    }

    async setTipInput(tip) {
        await this.tipInput.sendKeys(tip);
    }

    async getTipInput() {
        return this.tipInput.getAttribute('value');
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

    async setStatusInput(status) {
        await this.statusInput.sendKeys(status);
    }

    async getStatusInput() {
        return this.statusInput.getAttribute('value');
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

export class CustomersDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-customers-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-customers'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
