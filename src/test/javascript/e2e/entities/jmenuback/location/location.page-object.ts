import { element, by, ElementFinder } from 'protractor';

export class LocationComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-location div table .btn-danger'));
    title = element.all(by.css('jhi-location div h2#page-heading span')).first();

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

export class LocationUpdatePage {
    pageTitle = element(by.id('jhi-location-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    address1Input = element(by.id('field_address1'));
    address2Input = element(by.id('field_address2'));
    postalCodeInput = element(by.id('field_postalCode'));
    cityInput = element(by.id('field_city'));
    stateProvinceInput = element(by.id('field_stateProvince'));
    countryInput = element(by.id('field_country'));
    employeeSelect = element(by.id('field_employee'));
    businessSelect = element(by.id('field_business'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setAddress1Input(address1) {
        await this.address1Input.sendKeys(address1);
    }

    async getAddress1Input() {
        return this.address1Input.getAttribute('value');
    }

    async setAddress2Input(address2) {
        await this.address2Input.sendKeys(address2);
    }

    async getAddress2Input() {
        return this.address2Input.getAttribute('value');
    }

    async setPostalCodeInput(postalCode) {
        await this.postalCodeInput.sendKeys(postalCode);
    }

    async getPostalCodeInput() {
        return this.postalCodeInput.getAttribute('value');
    }

    async setCityInput(city) {
        await this.cityInput.sendKeys(city);
    }

    async getCityInput() {
        return this.cityInput.getAttribute('value');
    }

    async setStateProvinceInput(stateProvince) {
        await this.stateProvinceInput.sendKeys(stateProvince);
    }

    async getStateProvinceInput() {
        return this.stateProvinceInput.getAttribute('value');
    }

    async setCountryInput(country) {
        await this.countryInput.sendKeys(country);
    }

    async getCountryInput() {
        return this.countryInput.getAttribute('value');
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

export class LocationDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-location-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-location'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
