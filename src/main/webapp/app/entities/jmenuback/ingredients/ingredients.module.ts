import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { IonSharedModule } from 'app/shared';
import {
    IngredientsComponent,
    IngredientsDetailComponent,
    IngredientsUpdateComponent,
    IngredientsDeletePopupComponent,
    IngredientsDeleteDialogComponent,
    ingredientsRoute,
    ingredientsPopupRoute
} from './';

const ENTITY_STATES = [...ingredientsRoute, ...ingredientsPopupRoute];

@NgModule({
    imports: [IonSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        IngredientsComponent,
        IngredientsDetailComponent,
        IngredientsUpdateComponent,
        IngredientsDeleteDialogComponent,
        IngredientsDeletePopupComponent
    ],
    entryComponents: [IngredientsComponent, IngredientsUpdateComponent, IngredientsDeleteDialogComponent, IngredientsDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JmenubackIngredientsModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
