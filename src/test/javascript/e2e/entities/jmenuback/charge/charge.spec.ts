/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { ChargeComponentsPage, ChargeDeleteDialog, ChargeUpdatePage } from './charge.page-object';

const expect = chai.expect;

describe('Charge e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let chargeUpdatePage: ChargeUpdatePage;
    let chargeComponentsPage: ChargeComponentsPage;
    let chargeDeleteDialog: ChargeDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Charges', async () => {
        await navBarPage.goToEntity('charge');
        chargeComponentsPage = new ChargeComponentsPage();
        await browser.wait(ec.visibilityOf(chargeComponentsPage.title), 5000);
        expect(await chargeComponentsPage.getTitle()).to.eq('ionApp.jmenubackCharge.home.title');
    });

    it('should load create Charge page', async () => {
        await chargeComponentsPage.clickOnCreateButton();
        chargeUpdatePage = new ChargeUpdatePage();
        expect(await chargeUpdatePage.getPageTitle()).to.eq('ionApp.jmenubackCharge.home.createOrEditLabel');
        await chargeUpdatePage.cancel();
    });

    it('should create and save Charges', async () => {
        const nbButtonsBeforeCreate = await chargeComponentsPage.countDeleteButtons();

        await chargeComponentsPage.clickOnCreateButton();
        await promise.all([
            chargeUpdatePage.setChargeAmountInput('5'),
            chargeUpdatePage.setReasonForChargeInput('reasonForCharge'),
            chargeUpdatePage.setChargedTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM')
        ]);
        expect(await chargeUpdatePage.getChargeAmountInput()).to.eq('5');
        expect(await chargeUpdatePage.getReasonForChargeInput()).to.eq('reasonForCharge');
        expect(await chargeUpdatePage.getChargedTimeInput()).to.contain('2001-01-01T02:30');
        await chargeUpdatePage.save();
        expect(await chargeUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await chargeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Charge', async () => {
        const nbButtonsBeforeDelete = await chargeComponentsPage.countDeleteButtons();
        await chargeComponentsPage.clickOnLastDeleteButton();

        chargeDeleteDialog = new ChargeDeleteDialog();
        expect(await chargeDeleteDialog.getDialogTitle()).to.eq('ionApp.jmenubackCharge.delete.question');
        await chargeDeleteDialog.clickOnConfirmButton();

        expect(await chargeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
