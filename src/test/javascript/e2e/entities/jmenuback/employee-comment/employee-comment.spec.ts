/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { EmployeeCommentComponentsPage, EmployeeCommentDeleteDialog, EmployeeCommentUpdatePage } from './employee-comment.page-object';

const expect = chai.expect;

describe('EmployeeComment e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let employeeCommentUpdatePage: EmployeeCommentUpdatePage;
    let employeeCommentComponentsPage: EmployeeCommentComponentsPage;
    let employeeCommentDeleteDialog: EmployeeCommentDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load EmployeeComments', async () => {
        await navBarPage.goToEntity('employee-comment');
        employeeCommentComponentsPage = new EmployeeCommentComponentsPage();
        await browser.wait(ec.visibilityOf(employeeCommentComponentsPage.title), 5000);
        expect(await employeeCommentComponentsPage.getTitle()).to.eq('ionApp.jmenubackEmployeeComment.home.title');
    });

    it('should load create EmployeeComment page', async () => {
        await employeeCommentComponentsPage.clickOnCreateButton();
        employeeCommentUpdatePage = new EmployeeCommentUpdatePage();
        expect(await employeeCommentUpdatePage.getPageTitle()).to.eq('ionApp.jmenubackEmployeeComment.home.createOrEditLabel');
        await employeeCommentUpdatePage.cancel();
    });

    it('should create and save EmployeeComments', async () => {
        const nbButtonsBeforeCreate = await employeeCommentComponentsPage.countDeleteButtons();

        await employeeCommentComponentsPage.clickOnCreateButton();
        await promise.all([
            employeeCommentUpdatePage.setCommentTypeInput('commentType'),
            employeeCommentUpdatePage.setDescriptionInput('description'),
            employeeCommentUpdatePage.employeeSelectLastOption()
        ]);
        expect(await employeeCommentUpdatePage.getCommentTypeInput()).to.eq('commentType');
        expect(await employeeCommentUpdatePage.getDescriptionInput()).to.eq('description');
        await employeeCommentUpdatePage.save();
        expect(await employeeCommentUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await employeeCommentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last EmployeeComment', async () => {
        const nbButtonsBeforeDelete = await employeeCommentComponentsPage.countDeleteButtons();
        await employeeCommentComponentsPage.clickOnLastDeleteButton();

        employeeCommentDeleteDialog = new EmployeeCommentDeleteDialog();
        expect(await employeeCommentDeleteDialog.getDialogTitle()).to.eq('ionApp.jmenubackEmployeeComment.delete.question');
        await employeeCommentDeleteDialog.clickOnConfirmButton();

        expect(await employeeCommentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
