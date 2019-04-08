/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { MenuTypesComponentsPage, MenuTypesDeleteDialog, MenuTypesUpdatePage } from './menu-types.page-object';

const expect = chai.expect;

describe('MenuTypes e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let menuTypesUpdatePage: MenuTypesUpdatePage;
    let menuTypesComponentsPage: MenuTypesComponentsPage;
    let menuTypesDeleteDialog: MenuTypesDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load MenuTypes', async () => {
        await navBarPage.goToEntity('menu-types');
        menuTypesComponentsPage = new MenuTypesComponentsPage();
        await browser.wait(ec.visibilityOf(menuTypesComponentsPage.title), 5000);
        expect(await menuTypesComponentsPage.getTitle()).to.eq('ionApp.jmenubackMenuTypes.home.title');
    });

    it('should load create MenuTypes page', async () => {
        await menuTypesComponentsPage.clickOnCreateButton();
        menuTypesUpdatePage = new MenuTypesUpdatePage();
        expect(await menuTypesUpdatePage.getPageTitle()).to.eq('ionApp.jmenubackMenuTypes.home.createOrEditLabel');
        await menuTypesUpdatePage.cancel();
    });

    it('should create and save MenuTypes', async () => {
        const nbButtonsBeforeCreate = await menuTypesComponentsPage.countDeleteButtons();

        await menuTypesComponentsPage.clickOnCreateButton();
        await promise.all([
            menuTypesUpdatePage.setMenuTypeNameInput('menuTypeName'),
            menuTypesUpdatePage.setDescriptionInput('description')
        ]);
        expect(await menuTypesUpdatePage.getMenuTypeNameInput()).to.eq('menuTypeName');
        expect(await menuTypesUpdatePage.getDescriptionInput()).to.eq('description');
        await menuTypesUpdatePage.save();
        expect(await menuTypesUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await menuTypesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last MenuTypes', async () => {
        const nbButtonsBeforeDelete = await menuTypesComponentsPage.countDeleteButtons();
        await menuTypesComponentsPage.clickOnLastDeleteButton();

        menuTypesDeleteDialog = new MenuTypesDeleteDialog();
        expect(await menuTypesDeleteDialog.getDialogTitle()).to.eq('ionApp.jmenubackMenuTypes.delete.question');
        await menuTypesDeleteDialog.clickOnConfirmButton();

        expect(await menuTypesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
