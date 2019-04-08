/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { OrderCommentComponentsPage, OrderCommentDeleteDialog, OrderCommentUpdatePage } from './order-comment.page-object';

const expect = chai.expect;

describe('OrderComment e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let orderCommentUpdatePage: OrderCommentUpdatePage;
    let orderCommentComponentsPage: OrderCommentComponentsPage;
    let orderCommentDeleteDialog: OrderCommentDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load OrderComments', async () => {
        await navBarPage.goToEntity('order-comment');
        orderCommentComponentsPage = new OrderCommentComponentsPage();
        await browser.wait(ec.visibilityOf(orderCommentComponentsPage.title), 5000);
        expect(await orderCommentComponentsPage.getTitle()).to.eq('ionApp.jmenubackOrderComment.home.title');
    });

    it('should load create OrderComment page', async () => {
        await orderCommentComponentsPage.clickOnCreateButton();
        orderCommentUpdatePage = new OrderCommentUpdatePage();
        expect(await orderCommentUpdatePage.getPageTitle()).to.eq('ionApp.jmenubackOrderComment.home.createOrEditLabel');
        await orderCommentUpdatePage.cancel();
    });

    it('should create and save OrderComments', async () => {
        const nbButtonsBeforeCreate = await orderCommentComponentsPage.countDeleteButtons();

        await orderCommentComponentsPage.clickOnCreateButton();
        await promise.all([orderCommentUpdatePage.setOrdCommentInput('ordComment')]);
        expect(await orderCommentUpdatePage.getOrdCommentInput()).to.eq('ordComment');
        await orderCommentUpdatePage.save();
        expect(await orderCommentUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await orderCommentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last OrderComment', async () => {
        const nbButtonsBeforeDelete = await orderCommentComponentsPage.countDeleteButtons();
        await orderCommentComponentsPage.clickOnLastDeleteButton();

        orderCommentDeleteDialog = new OrderCommentDeleteDialog();
        expect(await orderCommentDeleteDialog.getDialogTitle()).to.eq('ionApp.jmenubackOrderComment.delete.question');
        await orderCommentDeleteDialog.clickOnConfirmButton();

        expect(await orderCommentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
