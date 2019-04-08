/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { PrintComponentsPage, PrintDeleteDialog, PrintUpdatePage } from './print.page-object';

const expect = chai.expect;

describe('Print e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let printUpdatePage: PrintUpdatePage;
    let printComponentsPage: PrintComponentsPage;
    let printDeleteDialog: PrintDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Prints', async () => {
        await navBarPage.goToEntity('print');
        printComponentsPage = new PrintComponentsPage();
        await browser.wait(ec.visibilityOf(printComponentsPage.title), 5000);
        expect(await printComponentsPage.getTitle()).to.eq('ionApp.jmenubackPrint.home.title');
    });

    it('should load create Print page', async () => {
        await printComponentsPage.clickOnCreateButton();
        printUpdatePage = new PrintUpdatePage();
        expect(await printUpdatePage.getPageTitle()).to.eq('ionApp.jmenubackPrint.home.createOrEditLabel');
        await printUpdatePage.cancel();
    });

    it('should create and save Prints', async () => {
        const nbButtonsBeforeCreate = await printComponentsPage.countDeleteButtons();

        await printComponentsPage.clickOnCreateButton();
        await promise.all([
            printUpdatePage.setOrderIDInput('5'),
            printUpdatePage.setTotalInput('5'),
            printUpdatePage.setPrintedTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM')
        ]);
        expect(await printUpdatePage.getOrderIDInput()).to.eq('5');
        expect(await printUpdatePage.getTotalInput()).to.eq('5');
        expect(await printUpdatePage.getPrintedTimeInput()).to.contain('2001-01-01T02:30');
        await printUpdatePage.save();
        expect(await printUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await printComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Print', async () => {
        const nbButtonsBeforeDelete = await printComponentsPage.countDeleteButtons();
        await printComponentsPage.clickOnLastDeleteButton();

        printDeleteDialog = new PrintDeleteDialog();
        expect(await printDeleteDialog.getDialogTitle()).to.eq('ionApp.jmenubackPrint.delete.question');
        await printDeleteDialog.clickOnConfirmButton();

        expect(await printComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
