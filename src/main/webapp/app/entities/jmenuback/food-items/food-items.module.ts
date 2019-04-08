import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { IonSharedModule } from 'app/shared';
import {
    FoodItemsComponent,
    FoodItemsDetailComponent,
    FoodItemsUpdateComponent,
    FoodItemsDeletePopupComponent,
    FoodItemsDeleteDialogComponent,
    foodItemsRoute,
    foodItemsPopupRoute
} from './';

const ENTITY_STATES = [...foodItemsRoute, ...foodItemsPopupRoute];

@NgModule({
    imports: [IonSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FoodItemsComponent,
        FoodItemsDetailComponent,
        FoodItemsUpdateComponent,
        FoodItemsDeleteDialogComponent,
        FoodItemsDeletePopupComponent
    ],
    entryComponents: [FoodItemsComponent, FoodItemsUpdateComponent, FoodItemsDeleteDialogComponent, FoodItemsDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JmenubackFoodItemsModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
