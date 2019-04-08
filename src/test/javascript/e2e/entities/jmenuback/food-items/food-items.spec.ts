/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { FoodItemsComponentsPage, FoodItemsDeleteDialog, FoodItemsUpdatePage } from './food-items.page-object';

const expect = chai.expect;

describe('FoodItems e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let foodItemsUpdatePage: FoodItemsUpdatePage;
    let foodItemsComponentsPage: FoodItemsComponentsPage;
    let foodItemsDeleteDialog: FoodItemsDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load FoodItems', async () => {
        await navBarPage.goToEntity('food-items');
        foodItemsComponentsPage = new FoodItemsComponentsPage();
        await browser.wait(ec.visibilityOf(foodItemsComponentsPage.title), 5000);
        expect(await foodItemsComponentsPage.getTitle()).to.eq('ionApp.jmenubackFoodItems.home.title');
    });

    it('should load create FoodItems page', async () => {
        await foodItemsComponentsPage.clickOnCreateButton();
        foodItemsUpdatePage = new FoodItemsUpdatePage();
        expect(await foodItemsUpdatePage.getPageTitle()).to.eq('ionApp.jmenubackFoodItems.home.createOrEditLabel');
        await foodItemsUpdatePage.cancel();
    });

    it('should create and save FoodItems', async () => {
        const nbButtonsBeforeCreate = await foodItemsComponentsPage.countDeleteButtons();

        await foodItemsComponentsPage.clickOnCreateButton();
        await promise.all([
            foodItemsUpdatePage.setItemNameInput('itemName'),
            foodItemsUpdatePage.setDescriptionInput('description'),
            foodItemsUpdatePage.setPriceInput('5'),
            foodItemsUpdatePage.setCaloriesInput('5')
        ]);
        expect(await foodItemsUpdatePage.getItemNameInput()).to.eq('itemName');
        expect(await foodItemsUpdatePage.getDescriptionInput()).to.eq('description');
        expect(await foodItemsUpdatePage.getPriceInput()).to.eq('5');
        expect(await foodItemsUpdatePage.getCaloriesInput()).to.eq('5');
        await foodItemsUpdatePage.save();
        expect(await foodItemsUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await foodItemsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last FoodItems', async () => {
        const nbButtonsBeforeDelete = await foodItemsComponentsPage.countDeleteButtons();
        await foodItemsComponentsPage.clickOnLastDeleteButton();

        foodItemsDeleteDialog = new FoodItemsDeleteDialog();
        expect(await foodItemsDeleteDialog.getDialogTitle()).to.eq('ionApp.jmenubackFoodItems.delete.question');
        await foodItemsDeleteDialog.clickOnConfirmButton();

        expect(await foodItemsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
