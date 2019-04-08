/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { BusinessComponentsPage, BusinessDeleteDialog, BusinessUpdatePage } from './business.page-object';

const expect = chai.expect;

describe('Business e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let businessUpdatePage: BusinessUpdatePage;
    let businessComponentsPage: BusinessComponentsPage;
    let businessDeleteDialog: BusinessDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Businesses', async () => {
        await navBarPage.goToEntity('business');
        businessComponentsPage = new BusinessComponentsPage();
        await browser.wait(ec.visibilityOf(businessComponentsPage.title), 5000);
        expect(await businessComponentsPage.getTitle()).to.eq('ionApp.jmenubackBusiness.home.title');
    });

    it('should load create Business page', async () => {
        await businessComponentsPage.clickOnCreateButton();
        businessUpdatePage = new BusinessUpdatePage();
        expect(await businessUpdatePage.getPageTitle()).to.eq('ionApp.jmenubackBusiness.home.createOrEditLabel');
        await businessUpdatePage.cancel();
    });

    it('should create and save Businesses', async () => {
        const nbButtonsBeforeCreate = await businessComponentsPage.countDeleteButtons();

        await businessComponentsPage.clickOnCreateButton();
        await promise.all([
            businessUpdatePage.setBusinessNameInput('businessName'),
            businessUpdatePage.setBusinessTypeInput('businessType'),
            businessUpdatePage.setDescriptionInput('description'),
            businessUpdatePage.setSignupDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            businessUpdatePage.setBusinessCellphoneInput('businessCellphone'),
            businessUpdatePage.setBusinessPhone1Input('businessPhone1'),
            businessUpdatePage.setBusinessPhone2Input('businessPhone2'),
            businessUpdatePage.setBusinessPhone3Input('businessPhone3'),
            businessUpdatePage.setStatusInput('5'),
            businessUpdatePage.employeeSelectLastOption()
        ]);
        expect(await businessUpdatePage.getBusinessNameInput()).to.eq('businessName');
        expect(await businessUpdatePage.getBusinessTypeInput()).to.eq('businessType');
        expect(await businessUpdatePage.getDescriptionInput()).to.eq('description');
        expect(await businessUpdatePage.getSignupDateInput()).to.contain('2001-01-01T02:30');
        expect(await businessUpdatePage.getBusinessCellphoneInput()).to.eq('businessCellphone');
        expect(await businessUpdatePage.getBusinessPhone1Input()).to.eq('businessPhone1');
        expect(await businessUpdatePage.getBusinessPhone2Input()).to.eq('businessPhone2');
        expect(await businessUpdatePage.getBusinessPhone3Input()).to.eq('businessPhone3');
        expect(await businessUpdatePage.getStatusInput()).to.eq('5');
        await businessUpdatePage.save();
        expect(await businessUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await businessComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Business', async () => {
        const nbButtonsBeforeDelete = await businessComponentsPage.countDeleteButtons();
        await businessComponentsPage.clickOnLastDeleteButton();

        businessDeleteDialog = new BusinessDeleteDialog();
        expect(await businessDeleteDialog.getDialogTitle()).to.eq('ionApp.jmenubackBusiness.delete.question');
        await businessDeleteDialog.clickOnConfirmButton();

        expect(await businessComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
