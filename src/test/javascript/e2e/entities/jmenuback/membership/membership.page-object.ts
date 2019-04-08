import { element, by, ElementFinder } from 'protractor';

export class MembershipComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-membership div table .btn-danger'));
    title = element.all(by.css('jhi-membership div h2#page-heading span')).first();

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

export class MembershipUpdatePage {
    pageTitle = element(by.id('jhi-membership-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    membershipNameInput = element(by.id('field_membershipName'));
    membershipTypeInput = element(by.id('field_membershipType'));
    subscriptionRateInput = element(by.id('field_subscriptionRate'));
    subscriptionAmountInput = element(by.id('field_subscriptionAmount'));
    descriptionInput = element(by.id('field_description'));
    businessSelect = element(by.id('field_business'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setMembershipNameInput(membershipName) {
        await this.membershipNameInput.sendKeys(membershipName);
    }

    async getMembershipNameInput() {
        return this.membershipNameInput.getAttribute('value');
    }

    async setMembershipTypeInput(membershipType) {
        await this.membershipTypeInput.sendKeys(membershipType);
    }

    async getMembershipTypeInput() {
        return this.membershipTypeInput.getAttribute('value');
    }

    async setSubscriptionRateInput(subscriptionRate) {
        await this.subscriptionRateInput.sendKeys(subscriptionRate);
    }

    async getSubscriptionRateInput() {
        return this.subscriptionRateInput.getAttribute('value');
    }

    async setSubscriptionAmountInput(subscriptionAmount) {
        await this.subscriptionAmountInput.sendKeys(subscriptionAmount);
    }

    async getSubscriptionAmountInput() {
        return this.subscriptionAmountInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
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

export class MembershipDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-membership-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-membership'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
