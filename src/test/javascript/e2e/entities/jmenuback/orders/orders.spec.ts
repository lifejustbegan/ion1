/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { OrdersComponentsPage, OrdersDeleteDialog, OrdersUpdatePage } from './orders.page-object';

const expect = chai.expect;

describe('Orders e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let ordersUpdatePage: OrdersUpdatePage;
    let ordersComponentsPage: OrdersComponentsPage;
    let ordersDeleteDialog: OrdersDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Orders', async () => {
        await navBarPage.goToEntity('orders');
        ordersComponentsPage = new OrdersComponentsPage();
        await browser.wait(ec.visibilityOf(ordersComponentsPage.title), 5000);
        expect(await ordersComponentsPage.getTitle()).to.eq('ionApp.jmenubackOrders.home.title');
    });

    it('should load create Orders page', async () => {
        await ordersComponentsPage.clickOnCreateButton();
        ordersUpdatePage = new OrdersUpdatePage();
        expect(await ordersUpdatePage.getPageTitle()).to.eq('ionApp.jmenubackOrders.home.createOrEditLabel');
        await ordersUpdatePage.cancel();
    });

    it('should create and save Orders', async () => {
        const nbButtonsBeforeCreate = await ordersComponentsPage.countDeleteButtons();

        await ordersComponentsPage.clickOnCreateButton();
        await promise.all([
            ordersUpdatePage.setOrderIDInput('orderID'),
            ordersUpdatePage.setOrderNameInput('orderName'),
            ordersUpdatePage.setPlacedTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            ordersUpdatePage.setClosedTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            ordersUpdatePage.setTotalClosedInput('5'),
            ordersUpdatePage.orderStatusSelectLastOption(),
            ordersUpdatePage.employeeSelectLastOption()
        ]);
        expect(await ordersUpdatePage.getOrderIDInput()).to.eq('orderID');
        expect(await ordersUpdatePage.getOrderNameInput()).to.eq('orderName');
        expect(await ordersUpdatePage.getPlacedTimeInput()).to.contain('2001-01-01T02:30');
        expect(await ordersUpdatePage.getClosedTimeInput()).to.contain('2001-01-01T02:30');
        expect(await ordersUpdatePage.getTotalClosedInput()).to.eq('5');
        await ordersUpdatePage.save();
        expect(await ordersUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await ordersComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Orders', async () => {
        const nbButtonsBeforeDelete = await ordersComponentsPage.countDeleteButtons();
        await ordersComponentsPage.clickOnLastDeleteButton();

        ordersDeleteDialog = new OrdersDeleteDialog();
        expect(await ordersDeleteDialog.getDialogTitle()).to.eq('ionApp.jmenubackOrders.delete.question');
        await ordersDeleteDialog.clickOnConfirmButton();

        expect(await ordersComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
