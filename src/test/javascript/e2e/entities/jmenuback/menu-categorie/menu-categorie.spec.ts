/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { MenuCategorieComponentsPage, MenuCategorieDeleteDialog, MenuCategorieUpdatePage } from './menu-categorie.page-object';

const expect = chai.expect;

describe('MenuCategorie e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let menuCategorieUpdatePage: MenuCategorieUpdatePage;
    let menuCategorieComponentsPage: MenuCategorieComponentsPage;
    let menuCategorieDeleteDialog: MenuCategorieDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load MenuCategories', async () => {
        await navBarPage.goToEntity('menu-categorie');
        menuCategorieComponentsPage = new MenuCategorieComponentsPage();
        await browser.wait(ec.visibilityOf(menuCategorieComponentsPage.title), 5000);
        expect(await menuCategorieComponentsPage.getTitle()).to.eq('ionApp.jmenubackMenuCategorie.home.title');
    });

    it('should load create MenuCategorie page', async () => {
        await menuCategorieComponentsPage.clickOnCreateButton();
        menuCategorieUpdatePage = new MenuCategorieUpdatePage();
        expect(await menuCategorieUpdatePage.getPageTitle()).to.eq('ionApp.jmenubackMenuCategorie.home.createOrEditLabel');
        await menuCategorieUpdatePage.cancel();
    });

    it('should create and save MenuCategories', async () => {
        const nbButtonsBeforeCreate = await menuCategorieComponentsPage.countDeleteButtons();

        await menuCategorieComponentsPage.clickOnCreateButton();
        await promise.all([menuCategorieUpdatePage.setCatNameInput('catName'), menuCategorieUpdatePage.setDescriptionInput('description')]);
        expect(await menuCategorieUpdatePage.getCatNameInput()).to.eq('catName');
        expect(await menuCategorieUpdatePage.getDescriptionInput()).to.eq('description');
        await menuCategorieUpdatePage.save();
        expect(await menuCategorieUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await menuCategorieComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last MenuCategorie', async () => {
        const nbButtonsBeforeDelete = await menuCategorieComponentsPage.countDeleteButtons();
        await menuCategorieComponentsPage.clickOnLastDeleteButton();

        menuCategorieDeleteDialog = new MenuCategorieDeleteDialog();
        expect(await menuCategorieDeleteDialog.getDialogTitle()).to.eq('ionApp.jmenubackMenuCategorie.delete.question');
        await menuCategorieDeleteDialog.clickOnConfirmButton();

        expect(await menuCategorieComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
