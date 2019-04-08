/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { TimesheetComponentsPage, TimesheetDeleteDialog, TimesheetUpdatePage } from './timesheet.page-object';

const expect = chai.expect;

describe('Timesheet e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let timesheetUpdatePage: TimesheetUpdatePage;
    let timesheetComponentsPage: TimesheetComponentsPage;
    let timesheetDeleteDialog: TimesheetDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Timesheets', async () => {
        await navBarPage.goToEntity('timesheet');
        timesheetComponentsPage = new TimesheetComponentsPage();
        await browser.wait(ec.visibilityOf(timesheetComponentsPage.title), 5000);
        expect(await timesheetComponentsPage.getTitle()).to.eq('ionApp.jmenubackTimesheet.home.title');
    });

    it('should load create Timesheet page', async () => {
        await timesheetComponentsPage.clickOnCreateButton();
        timesheetUpdatePage = new TimesheetUpdatePage();
        expect(await timesheetUpdatePage.getPageTitle()).to.eq('ionApp.jmenubackTimesheet.home.createOrEditLabel');
        await timesheetUpdatePage.cancel();
    });

    it('should create and save Timesheets', async () => {
        const nbButtonsBeforeCreate = await timesheetComponentsPage.countDeleteButtons();

        await timesheetComponentsPage.clickOnCreateButton();
        await promise.all([
            timesheetUpdatePage.setDateTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            timesheetUpdatePage.setPunchInTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            timesheetUpdatePage.setPunchOutTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            timesheetUpdatePage.setBreakTimeOutInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            timesheetUpdatePage.setBreakTimeInInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            timesheetUpdatePage.employeeSelectLastOption(),
            timesheetUpdatePage.businessSelectLastOption()
        ]);
        expect(await timesheetUpdatePage.getDateTimeInput()).to.contain('2001-01-01T02:30');
        expect(await timesheetUpdatePage.getPunchInTimeInput()).to.contain('2001-01-01T02:30');
        expect(await timesheetUpdatePage.getPunchOutTimeInput()).to.contain('2001-01-01T02:30');
        expect(await timesheetUpdatePage.getBreakTimeOutInput()).to.contain('2001-01-01T02:30');
        expect(await timesheetUpdatePage.getBreakTimeInInput()).to.contain('2001-01-01T02:30');
        await timesheetUpdatePage.save();
        expect(await timesheetUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await timesheetComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Timesheet', async () => {
        const nbButtonsBeforeDelete = await timesheetComponentsPage.countDeleteButtons();
        await timesheetComponentsPage.clickOnLastDeleteButton();

        timesheetDeleteDialog = new TimesheetDeleteDialog();
        expect(await timesheetDeleteDialog.getDialogTitle()).to.eq('ionApp.jmenubackTimesheet.delete.question');
        await timesheetDeleteDialog.clickOnConfirmButton();

        expect(await timesheetComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
