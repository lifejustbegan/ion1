/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
    PreDefinedOrderCommentsComponentsPage,
    PreDefinedOrderCommentsDeleteDialog,
    PreDefinedOrderCommentsUpdatePage
} from './pre-defined-order-comments.page-object';

const expect = chai.expect;

describe('PreDefinedOrderComments e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let preDefinedOrderCommentsUpdatePage: PreDefinedOrderCommentsUpdatePage;
    let preDefinedOrderCommentsComponentsPage: PreDefinedOrderCommentsComponentsPage;
    let preDefinedOrderCommentsDeleteDialog: PreDefinedOrderCommentsDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load PreDefinedOrderComments', async () => {
        await navBarPage.goToEntity('pre-defined-order-comments');
        preDefinedOrderCommentsComponentsPage = new PreDefinedOrderCommentsComponentsPage();
        await browser.wait(ec.visibilityOf(preDefinedOrderCommentsComponentsPage.title), 5000);
        expect(await preDefinedOrderCommentsComponentsPage.getTitle()).to.eq('ionApp.jmenubackPreDefinedOrderComments.home.title');
    });

    it('should load create PreDefinedOrderComments page', async () => {
        await preDefinedOrderCommentsComponentsPage.clickOnCreateButton();
        preDefinedOrderCommentsUpdatePage = new PreDefinedOrderCommentsUpdatePage();
        expect(await preDefinedOrderCommentsUpdatePage.getPageTitle()).to.eq(
            'ionApp.jmenubackPreDefinedOrderComments.home.createOrEditLabel'
        );
        await preDefinedOrderCommentsUpdatePage.cancel();
    });

    it('should create and save PreDefinedOrderComments', async () => {
        const nbButtonsBeforeCreate = await preDefinedOrderCommentsComponentsPage.countDeleteButtons();

        await preDefinedOrderCommentsComponentsPage.clickOnCreateButton();
        await promise.all([preDefinedOrderCommentsUpdatePage.setPreCommentInput('preComment')]);
        expect(await preDefinedOrderCommentsUpdatePage.getPreCommentInput()).to.eq('preComment');
        await preDefinedOrderCommentsUpdatePage.save();
        expect(await preDefinedOrderCommentsUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await preDefinedOrderCommentsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last PreDefinedOrderComments', async () => {
        const nbButtonsBeforeDelete = await preDefinedOrderCommentsComponentsPage.countDeleteButtons();
        await preDefinedOrderCommentsComponentsPage.clickOnLastDeleteButton();

        preDefinedOrderCommentsDeleteDialog = new PreDefinedOrderCommentsDeleteDialog();
        expect(await preDefinedOrderCommentsDeleteDialog.getDialogTitle()).to.eq('ionApp.jmenubackPreDefinedOrderComments.delete.question');
        await preDefinedOrderCommentsDeleteDialog.clickOnConfirmButton();

        expect(await preDefinedOrderCommentsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
