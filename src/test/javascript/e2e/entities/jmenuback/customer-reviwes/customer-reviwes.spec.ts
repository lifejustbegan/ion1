/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { CustomerReviwesComponentsPage, CustomerReviwesDeleteDialog, CustomerReviwesUpdatePage } from './customer-reviwes.page-object';

const expect = chai.expect;

describe('CustomerReviwes e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let customerReviwesUpdatePage: CustomerReviwesUpdatePage;
    let customerReviwesComponentsPage: CustomerReviwesComponentsPage;
    let customerReviwesDeleteDialog: CustomerReviwesDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load CustomerReviwes', async () => {
        await navBarPage.goToEntity('customer-reviwes');
        customerReviwesComponentsPage = new CustomerReviwesComponentsPage();
        await browser.wait(ec.visibilityOf(customerReviwesComponentsPage.title), 5000);
        expect(await customerReviwesComponentsPage.getTitle()).to.eq('ionApp.jmenubackCustomerReviwes.home.title');
    });

    it('should load create CustomerReviwes page', async () => {
        await customerReviwesComponentsPage.clickOnCreateButton();
        customerReviwesUpdatePage = new CustomerReviwesUpdatePage();
        expect(await customerReviwesUpdatePage.getPageTitle()).to.eq('ionApp.jmenubackCustomerReviwes.home.createOrEditLabel');
        await customerReviwesUpdatePage.cancel();
    });

    it('should create and save CustomerReviwes', async () => {
        const nbButtonsBeforeCreate = await customerReviwesComponentsPage.countDeleteButtons();

        await customerReviwesComponentsPage.clickOnCreateButton();
        await promise.all([
            customerReviwesUpdatePage.setReviewInput('review'),
            customerReviwesUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM')
        ]);
        expect(await customerReviwesUpdatePage.getReviewInput()).to.eq('review');
        expect(await customerReviwesUpdatePage.getCreatedDateInput()).to.contain('2001-01-01T02:30');
        await customerReviwesUpdatePage.save();
        expect(await customerReviwesUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await customerReviwesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last CustomerReviwes', async () => {
        const nbButtonsBeforeDelete = await customerReviwesComponentsPage.countDeleteButtons();
        await customerReviwesComponentsPage.clickOnLastDeleteButton();

        customerReviwesDeleteDialog = new CustomerReviwesDeleteDialog();
        expect(await customerReviwesDeleteDialog.getDialogTitle()).to.eq('ionApp.jmenubackCustomerReviwes.delete.question');
        await customerReviwesDeleteDialog.clickOnConfirmButton();

        expect(await customerReviwesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
