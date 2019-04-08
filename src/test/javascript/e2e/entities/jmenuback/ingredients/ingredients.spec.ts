/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { IngredientsComponentsPage, IngredientsDeleteDialog, IngredientsUpdatePage } from './ingredients.page-object';

const expect = chai.expect;

describe('Ingredients e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let ingredientsUpdatePage: IngredientsUpdatePage;
    let ingredientsComponentsPage: IngredientsComponentsPage;
    let ingredientsDeleteDialog: IngredientsDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Ingredients', async () => {
        await navBarPage.goToEntity('ingredients');
        ingredientsComponentsPage = new IngredientsComponentsPage();
        await browser.wait(ec.visibilityOf(ingredientsComponentsPage.title), 5000);
        expect(await ingredientsComponentsPage.getTitle()).to.eq('ionApp.jmenubackIngredients.home.title');
    });

    it('should load create Ingredients page', async () => {
        await ingredientsComponentsPage.clickOnCreateButton();
        ingredientsUpdatePage = new IngredientsUpdatePage();
        expect(await ingredientsUpdatePage.getPageTitle()).to.eq('ionApp.jmenubackIngredients.home.createOrEditLabel');
        await ingredientsUpdatePage.cancel();
    });

    it('should create and save Ingredients', async () => {
        const nbButtonsBeforeCreate = await ingredientsComponentsPage.countDeleteButtons();

        await ingredientsComponentsPage.clickOnCreateButton();
        await promise.all([ingredientsUpdatePage.setIngredientNameInput('ingredientName')]);
        expect(await ingredientsUpdatePage.getIngredientNameInput()).to.eq('ingredientName');
        await ingredientsUpdatePage.save();
        expect(await ingredientsUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await ingredientsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Ingredients', async () => {
        const nbButtonsBeforeDelete = await ingredientsComponentsPage.countDeleteButtons();
        await ingredientsComponentsPage.clickOnLastDeleteButton();

        ingredientsDeleteDialog = new IngredientsDeleteDialog();
        expect(await ingredientsDeleteDialog.getDialogTitle()).to.eq('ionApp.jmenubackIngredients.delete.question');
        await ingredientsDeleteDialog.clickOnConfirmButton();

        expect(await ingredientsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
