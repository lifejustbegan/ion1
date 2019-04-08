import { element, by, ElementFinder } from 'protractor';

export class EmployeSalaryComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-employe-salary div table .btn-danger'));
    title = element.all(by.css('jhi-employe-salary div h2#page-heading span')).first();

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

export class EmployeSalaryUpdatePage {
    pageTitle = element(by.id('jhi-employe-salary-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    hourlyInput = element(by.id('field_hourly'));
    weeklyInput = element(by.id('field_weekly'));
    biWeeklyInput = element(by.id('field_biWeekly'));
    monthlyInput = element(by.id('field_monthly'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setHourlyInput(hourly) {
        await this.hourlyInput.sendKeys(hourly);
    }

    async getHourlyInput() {
        return this.hourlyInput.getAttribute('value');
    }

    async setWeeklyInput(weekly) {
        await this.weeklyInput.sendKeys(weekly);
    }

    async getWeeklyInput() {
        return this.weeklyInput.getAttribute('value');
    }

    async setBiWeeklyInput(biWeekly) {
        await this.biWeeklyInput.sendKeys(biWeekly);
    }

    async getBiWeeklyInput() {
        return this.biWeeklyInput.getAttribute('value');
    }

    async setMonthlyInput(monthly) {
        await this.monthlyInput.sendKeys(monthly);
    }

    async getMonthlyInput() {
        return this.monthlyInput.getAttribute('value');
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

export class EmployeSalaryDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-employeSalary-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-employeSalary'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
