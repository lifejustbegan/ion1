/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { TablesComponentsPage, TablesDeleteDialog, TablesUpdatePage } from './tables.page-object';

const expect = chai.expect;

describe('Tables e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let tablesUpdatePage: TablesUpdatePage;
    let tablesComponentsPage: TablesComponentsPage;
    let tablesDeleteDialog: TablesDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Tables', async () => {
        await navBarPage.goToEntity('tables');
        tablesComponentsPage = new TablesComponentsPage();
        await browser.wait(ec.visibilityOf(tablesComponentsPage.title), 5000);
        expect(await tablesComponentsPage.getTitle()).to.eq('ionApp.jmenubackTables.home.title');
    });

    it('should load create Tables page', async () => {
        await tablesComponentsPage.clickOnCreateButton();
        tablesUpdatePage = new TablesUpdatePage();
        expect(await tablesUpdatePage.getPageTitle()).to.eq('ionApp.jmenubackTables.home.createOrEditLabel');
        await tablesUpdatePage.cancel();
    });

    it('should create and save Tables', async () => {
        const nbButtonsBeforeCreate = await tablesComponentsPage.countDeleteButtons();

        await tablesComponentsPage.clickOnCreateButton();
        await promise.all([
            tablesUpdatePage.setTableNameInput('tableName'),
            tablesUpdatePage.setTableNumberInput('5'),
            tablesUpdatePage.setDescriptionInput('description')
        ]);
        expect(await tablesUpdatePage.getTableNameInput()).to.eq('tableName');
        expect(await tablesUpdatePage.getTableNumberInput()).to.eq('5');
        expect(await tablesUpdatePage.getDescriptionInput()).to.eq('description');
        await tablesUpdatePage.save();
        expect(await tablesUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await tablesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Tables', async () => {
        const nbButtonsBeforeDelete = await tablesComponentsPage.countDeleteButtons();
        await tablesComponentsPage.clickOnLastDeleteButton();

        tablesDeleteDialog = new TablesDeleteDialog();
        expect(await tablesDeleteDialog.getDialogTitle()).to.eq('ionApp.jmenubackTables.delete.question');
        await tablesDeleteDialog.clickOnConfirmButton();

        expect(await tablesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
