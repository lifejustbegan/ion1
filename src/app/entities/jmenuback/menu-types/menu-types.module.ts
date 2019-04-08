import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { IonSharedModule } from 'app/shared';
import {
    MenuTypesComponent,
    MenuTypesDetailComponent,
    MenuTypesUpdateComponent,
    MenuTypesDeletePopupComponent,
    MenuTypesDeleteDialogComponent,
    menuTypesRoute,
    menuTypesPopupRoute
} from './';

const ENTITY_STATES = [...menuTypesRoute, ...menuTypesPopupRoute];

@NgModule({
    imports: [IonSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MenuTypesComponent,
        MenuTypesDetailComponent,
        MenuTypesUpdateComponent,
        MenuTypesDeleteDialogComponent,
        MenuTypesDeletePopupComponent
    ],
    entryComponents: [MenuTypesComponent, MenuTypesUpdateComponent, MenuTypesDeleteDialogComponent, MenuTypesDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JmenubackMenuTypesModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
