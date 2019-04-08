/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { EmployeSalaryComponentsPage, EmployeSalaryDeleteDialog, EmployeSalaryUpdatePage } from './employe-salary.page-object';

const expect = chai.expect;

describe('EmployeSalary e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let employeSalaryUpdatePage: EmployeSalaryUpdatePage;
    let employeSalaryComponentsPage: EmployeSalaryComponentsPage;
    let employeSalaryDeleteDialog: EmployeSalaryDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load EmployeSalaries', async () => {
        await navBarPage.goToEntity('employe-salary');
        employeSalaryComponentsPage = new EmployeSalaryComponentsPage();
        await browser.wait(ec.visibilityOf(employeSalaryComponentsPage.title), 5000);
        expect(await employeSalaryComponentsPage.getTitle()).to.eq('ionApp.jmenubackEmployeSalary.home.title');
    });

    it('should load create EmployeSalary page', async () => {
        await employeSalaryComponentsPage.clickOnCreateButton();
        employeSalaryUpdatePage = new EmployeSalaryUpdatePage();
        expect(await employeSalaryUpdatePage.getPageTitle()).to.eq('ionApp.jmenubackEmployeSalary.home.createOrEditLabel');
        await employeSalaryUpdatePage.cancel();
    });

    it('should create and save EmployeSalaries', async () => {
        const nbButtonsBeforeCreate = await employeSalaryComponentsPage.countDeleteButtons();

        await employeSalaryComponentsPage.clickOnCreateButton();
        await promise.all([
            employeSalaryUpdatePage.setHourlyInput('5'),
            employeSalaryUpdatePage.setWeeklyInput('5'),
            employeSalaryUpdatePage.setBiWeeklyInput('5'),
            employeSalaryUpdatePage.setMonthlyInput('5')
        ]);
        expect(await employeSalaryUpdatePage.getHourlyInput()).to.eq('5');
        expect(await employeSalaryUpdatePage.getWeeklyInput()).to.eq('5');
        expect(await employeSalaryUpdatePage.getBiWeeklyInput()).to.eq('5');
        expect(await employeSalaryUpdatePage.getMonthlyInput()).to.eq('5');
        await employeSalaryUpdatePage.save();
        expect(await employeSalaryUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await employeSalaryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last EmployeSalary', async () => {
        const nbButtonsBeforeDelete = await employeSalaryComponentsPage.countDeleteButtons();
        await employeSalaryComponentsPage.clickOnLastDeleteButton();

        employeSalaryDeleteDialog = new EmployeSalaryDeleteDialog();
        expect(await employeSalaryDeleteDialog.getDialogTitle()).to.eq('ionApp.jmenubackEmployeSalary.delete.question');
        await employeSalaryDeleteDialog.clickOnConfirmButton();

        expect(await employeSalaryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
