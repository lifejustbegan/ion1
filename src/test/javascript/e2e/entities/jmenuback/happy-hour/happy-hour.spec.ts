/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { HappyHourComponentsPage, HappyHourDeleteDialog, HappyHourUpdatePage } from './happy-hour.page-object';

const expect = chai.expect;

describe('HappyHour e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let happyHourUpdatePage: HappyHourUpdatePage;
    let happyHourComponentsPage: HappyHourComponentsPage;
    let happyHourDeleteDialog: HappyHourDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load HappyHours', async () => {
        await navBarPage.goToEntity('happy-hour');
        happyHourComponentsPage = new HappyHourComponentsPage();
        await browser.wait(ec.visibilityOf(happyHourComponentsPage.title), 5000);
        expect(await happyHourComponentsPage.getTitle()).to.eq('ionApp.jmenubackHappyHour.home.title');
    });

    it('should load create HappyHour page', async () => {
        await happyHourComponentsPage.clickOnCreateButton();
        happyHourUpdatePage = new HappyHourUpdatePage();
        expect(await happyHourUpdatePage.getPageTitle()).to.eq('ionApp.jmenubackHappyHour.home.createOrEditLabel');
        await happyHourUpdatePage.cancel();
    });

    it('should create and save HappyHours', async () => {
        const nbButtonsBeforeCreate = await happyHourComponentsPage.countDeleteButtons();

        await happyHourComponentsPage.clickOnCreateButton();
        await promise.all([happyHourUpdatePage.setNewPriceInput('5'), happyHourUpdatePage.setByCategorieInput('byCategorie')]);
        expect(await happyHourUpdatePage.getNewPriceInput()).to.eq('5');
        expect(await happyHourUpdatePage.getByCategorieInput()).to.eq('byCategorie');
        await happyHourUpdatePage.save();
        expect(await happyHourUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await happyHourComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last HappyHour', async () => {
        const nbButtonsBeforeDelete = await happyHourComponentsPage.countDeleteButtons();
        await happyHourComponentsPage.clickOnLastDeleteButton();

        happyHourDeleteDialog = new HappyHourDeleteDialog();
        expect(await happyHourDeleteDialog.getDialogTitle()).to.eq('ionApp.jmenubackHappyHour.delete.question');
        await happyHourDeleteDialog.clickOnConfirmButton();

        expect(await happyHourComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
