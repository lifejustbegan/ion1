/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { CustomersComponentsPage, CustomersDeleteDialog, CustomersUpdatePage } from './customers.page-object';

const expect = chai.expect;

describe('Customers e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let customersUpdatePage: CustomersUpdatePage;
    let customersComponentsPage: CustomersComponentsPage;
    let customersDeleteDialog: CustomersDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Customers', async () => {
        await navBarPage.goToEntity('customers');
        customersComponentsPage = new CustomersComponentsPage();
        await browser.wait(ec.visibilityOf(customersComponentsPage.title), 5000);
        expect(await customersComponentsPage.getTitle()).to.eq('ionApp.jmenubackCustomers.home.title');
    });

    it('should load create Customers page', async () => {
        await customersComponentsPage.clickOnCreateButton();
        customersUpdatePage = new CustomersUpdatePage();
        expect(await customersUpdatePage.getPageTitle()).to.eq('ionApp.jmenubackCustomers.home.createOrEditLabel');
        await customersUpdatePage.cancel();
    });

    it('should create and save Customers', async () => {
        const nbButtonsBeforeCreate = await customersComponentsPage.countDeleteButtons();

        await customersComponentsPage.clickOnCreateButton();
        await promise.all([
            customersUpdatePage.setFirstNameInput('firstName'),
            customersUpdatePage.setLastNameInput('lastName'),
            customersUpdatePage.setMiddleNameInput('middleName'),
            customersUpdatePage.setDobInput('dob'),
            customersUpdatePage.setEmailInput('email'),
            customersUpdatePage.setCellNumberInput('cellNumber'),
            customersUpdatePage.setBusinessPhoneInput('businessPhone'),
            customersUpdatePage.setSignupDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            customersUpdatePage.setMembershipTypeInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            customersUpdatePage.setTipInput('5'),
            customersUpdatePage.jobTitleSelectLastOption(),
            customersUpdatePage.setStatusInput('5')
        ]);
        expect(await customersUpdatePage.getFirstNameInput()).to.eq('firstName');
        expect(await customersUpdatePage.getLastNameInput()).to.eq('lastName');
        expect(await customersUpdatePage.getMiddleNameInput()).to.eq('middleName');
        expect(await customersUpdatePage.getDobInput()).to.eq('dob');
        expect(await customersUpdatePage.getEmailInput()).to.eq('email');
        expect(await customersUpdatePage.getCellNumberInput()).to.eq('cellNumber');
        expect(await customersUpdatePage.getBusinessPhoneInput()).to.eq('businessPhone');
        expect(await customersUpdatePage.getSignupDateInput()).to.contain('2001-01-01T02:30');
        expect(await customersUpdatePage.getMembershipTypeInput()).to.contain('2001-01-01T02:30');
        expect(await customersUpdatePage.getTipInput()).to.eq('5');
        expect(await customersUpdatePage.getStatusInput()).to.eq('5');
        await customersUpdatePage.save();
        expect(await customersUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await customersComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Customers', async () => {
        const nbButtonsBeforeDelete = await customersComponentsPage.countDeleteButtons();
        await customersComponentsPage.clickOnLastDeleteButton();

        customersDeleteDialog = new CustomersDeleteDialog();
        expect(await customersDeleteDialog.getDialogTitle()).to.eq('ionApp.jmenubackCustomers.delete.question');
        await customersDeleteDialog.clickOnConfirmButton();

        expect(await customersComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
