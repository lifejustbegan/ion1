/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { ScheduleComponentsPage, ScheduleDeleteDialog, ScheduleUpdatePage } from './schedule.page-object';

const expect = chai.expect;

describe('Schedule e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let scheduleUpdatePage: ScheduleUpdatePage;
    let scheduleComponentsPage: ScheduleComponentsPage;
    let scheduleDeleteDialog: ScheduleDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Schedules', async () => {
        await navBarPage.goToEntity('schedule');
        scheduleComponentsPage = new ScheduleComponentsPage();
        await browser.wait(ec.visibilityOf(scheduleComponentsPage.title), 5000);
        expect(await scheduleComponentsPage.getTitle()).to.eq('ionApp.jmenubackSchedule.home.title');
    });

    it('should load create Schedule page', async () => {
        await scheduleComponentsPage.clickOnCreateButton();
        scheduleUpdatePage = new ScheduleUpdatePage();
        expect(await scheduleUpdatePage.getPageTitle()).to.eq('ionApp.jmenubackSchedule.home.createOrEditLabel');
        await scheduleUpdatePage.cancel();
    });

    it('should create and save Schedules', async () => {
        const nbButtonsBeforeCreate = await scheduleComponentsPage.countDeleteButtons();

        await scheduleComponentsPage.clickOnCreateButton();
        await promise.all([
            scheduleUpdatePage.setScheduleNameInput('scheduleName'),
            scheduleUpdatePage.setShiftStartTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            scheduleUpdatePage.businessSelectLastOption()
        ]);
        expect(await scheduleUpdatePage.getScheduleNameInput()).to.eq('scheduleName');
        expect(await scheduleUpdatePage.getShiftStartTimeInput()).to.contain('2001-01-01T02:30');
        await scheduleUpdatePage.save();
        expect(await scheduleUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await scheduleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Schedule', async () => {
        const nbButtonsBeforeDelete = await scheduleComponentsPage.countDeleteButtons();
        await scheduleComponentsPage.clickOnLastDeleteButton();

        scheduleDeleteDialog = new ScheduleDeleteDialog();
        expect(await scheduleDeleteDialog.getDialogTitle()).to.eq('ionApp.jmenubackSchedule.delete.question');
        await scheduleDeleteDialog.clickOnConfirmButton();

        expect(await scheduleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
