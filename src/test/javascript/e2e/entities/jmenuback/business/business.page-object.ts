import { element, by, ElementFinder } from 'protractor';

export class BusinessComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-business div table .btn-danger'));
    title = element.all(by.css('jhi-business div h2#page-heading span')).first();

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

export class BusinessUpdatePage {
    pageTitle = element(by.id('jhi-business-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    businessNameInput = element(by.id('field_businessName'));
    businessTypeInput = element(by.id('field_businessType'));
    descriptionInput = element(by.id('field_description'));
    signupDateInput = element(by.id('field_signupDate'));
    businessCellphoneInput = element(by.id('field_businessCellphone'));
    businessPhone1Input = element(by.id('field_businessPhone1'));
    businessPhone2Input = element(by.id('field_businessPhone2'));
    businessPhone3Input = element(by.id('field_businessPhone3'));
    statusInput = element(by.id('field_status'));
    employeeSelect = element(by.id('field_employee'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setBusinessNameInput(businessName) {
        await this.businessNameInput.sendKeys(businessName);
    }

    async getBusinessNameInput() {
        return this.businessNameInput.getAttribute('value');
    }

    async setBusinessTypeInput(businessType) {
        await this.businessTypeInput.sendKeys(businessType);
    }

    async getBusinessTypeInput() {
        return this.businessTypeInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async setSignupDateInput(signupDate) {
        await this.signupDateInput.sendKeys(signupDate);
    }

    async getSignupDateInput() {
        return this.signupDateInput.getAttribute('value');
    }

    async setBusinessCellphoneInput(businessCellphone) {
        await this.businessCellphoneInput.sendKeys(businessCellphone);
    }

    async getBusinessCellphoneInput() {
        return this.businessCellphoneInput.getAttribute('value');
    }

    async setBusinessPhone1Input(businessPhone1) {
        await this.businessPhone1Input.sendKeys(businessPhone1);
    }

    async getBusinessPhone1Input() {
        return this.businessPhone1Input.getAttribute('value');
    }

    async setBusinessPhone2Input(businessPhone2) {
        await this.businessPhone2Input.sendKeys(businessPhone2);
    }

    async getBusinessPhone2Input() {
        return this.businessPhone2Input.getAttribute('value');
    }

    async setBusinessPhone3Input(businessPhone3) {
        await this.businessPhone3Input.sendKeys(businessPhone3);
    }

    async getBusinessPhone3Input() {
        return this.businessPhone3Input.getAttribute('value');
    }

    async setStatusInput(status) {
        await this.statusInput.sendKeys(status);
    }

    async getStatusInput() {
        return this.statusInput.getAttribute('value');
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

export class BusinessDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-business-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-business'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
