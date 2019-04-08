/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { MembershipComponentsPage, MembershipDeleteDialog, MembershipUpdatePage } from './membership.page-object';

const expect = chai.expect;

describe('Membership e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let membershipUpdatePage: MembershipUpdatePage;
    let membershipComponentsPage: MembershipComponentsPage;
    let membershipDeleteDialog: MembershipDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Memberships', async () => {
        await navBarPage.goToEntity('membership');
        membershipComponentsPage = new MembershipComponentsPage();
        await browser.wait(ec.visibilityOf(membershipComponentsPage.title), 5000);
        expect(await membershipComponentsPage.getTitle()).to.eq('ionApp.jmenubackMembership.home.title');
    });

    it('should load create Membership page', async () => {
        await membershipComponentsPage.clickOnCreateButton();
        membershipUpdatePage = new MembershipUpdatePage();
        expect(await membershipUpdatePage.getPageTitle()).to.eq('ionApp.jmenubackMembership.home.createOrEditLabel');
        await membershipUpdatePage.cancel();
    });

    it('should create and save Memberships', async () => {
        const nbButtonsBeforeCreate = await membershipComponentsPage.countDeleteButtons();

        await membershipComponentsPage.clickOnCreateButton();
        await promise.all([
            membershipUpdatePage.setMembershipNameInput('membershipName'),
            membershipUpdatePage.setMembershipTypeInput('membershipType'),
            membershipUpdatePage.setSubscriptionRateInput('subscriptionRate'),
            membershipUpdatePage.setSubscriptionAmountInput('5'),
            membershipUpdatePage.setDescriptionInput('description'),
            membershipUpdatePage.businessSelectLastOption()
        ]);
        expect(await membershipUpdatePage.getMembershipNameInput()).to.eq('membershipName');
        expect(await membershipUpdatePage.getMembershipTypeInput()).to.eq('membershipType');
        expect(await membershipUpdatePage.getSubscriptionRateInput()).to.eq('subscriptionRate');
        expect(await membershipUpdatePage.getSubscriptionAmountInput()).to.eq('5');
        expect(await membershipUpdatePage.getDescriptionInput()).to.eq('description');
        await membershipUpdatePage.save();
        expect(await membershipUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await membershipComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Membership', async () => {
        const nbButtonsBeforeDelete = await membershipComponentsPage.countDeleteButtons();
        await membershipComponentsPage.clickOnLastDeleteButton();

        membershipDeleteDialog = new MembershipDeleteDialog();
        expect(await membershipDeleteDialog.getDialogTitle()).to.eq('ionApp.jmenubackMembership.delete.question');
        await membershipDeleteDialog.clickOnConfirmButton();

        expect(await membershipComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
