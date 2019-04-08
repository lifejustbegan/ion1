import { element, by, ElementFinder } from 'protractor';

export class ChargeComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-charge div table .btn-danger'));
    title = element.all(by.css('jhi-charge div h2#page-heading span')).first();

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

export class ChargeUpdatePage {
    pageTitle = element(by.id('jhi-charge-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    chargeAmountInput = element(by.id('field_chargeAmount'));
    reasonForChargeInput = element(by.id('field_reasonForCharge'));
    chargedTimeInput = element(by.id('field_chargedTime'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setChargeAmountInput(chargeAmount) {
        await this.chargeAmountInput.sendKeys(chargeAmount);
    }

    async getChargeAmountInput() {
        return this.chargeAmountInput.getAttribute('value');
    }

    async setReasonForChargeInput(reasonForCharge) {
        await this.reasonForChargeInput.sendKeys(reasonForCharge);
    }

    async getReasonForChargeInput() {
        return this.reasonForChargeInput.getAttribute('value');
    }

    async setChargedTimeInput(chargedTime) {
        await this.chargedTimeInput.sendKeys(chargedTime);
    }

    async getChargedTimeInput() {
        return this.chargedTimeInput.getAttribute('value');
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

export class ChargeDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-charge-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-charge'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
