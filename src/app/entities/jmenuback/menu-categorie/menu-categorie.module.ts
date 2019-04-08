import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { IonSharedModule } from 'app/shared';
import {
    MenuCategorieComponent,
    MenuCategorieDetailComponent,
    MenuCategorieUpdateComponent,
    MenuCategorieDeletePopupComponent,
    MenuCategorieDeleteDialogComponent,
    menuCategorieRoute,
    menuCategoriePopupRoute
} from './';

const ENTITY_STATES = [...menuCategorieRoute, ...menuCategoriePopupRoute];

@NgModule({
    imports: [IonSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MenuCategorieComponent,
        MenuCategorieDetailComponent,
        MenuCategorieUpdateComponent,
        MenuCategorieDeleteDialogComponent,
        MenuCategorieDeletePopupComponent
    ],
    entryComponents: [
        MenuCategorieComponent,
        MenuCategorieUpdateComponent,
        MenuCategorieDeleteDialogComponent,
        MenuCategorieDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JmenubackMenuCategorieModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
