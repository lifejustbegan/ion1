import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { IonSharedModule } from 'app/shared';
import {
    TablesComponent,
    TablesDetailComponent,
    TablesUpdateComponent,
    TablesDeletePopupComponent,
    TablesDeleteDialogComponent,
    tablesRoute,
    tablesPopupRoute
} from './';

const ENTITY_STATES = [...tablesRoute, ...tablesPopupRoute];

@NgModule({
    imports: [IonSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [TablesComponent, TablesDetailComponent, TablesUpdateComponent, TablesDeleteDialogComponent, TablesDeletePopupComponent],
    entryComponents: [TablesComponent, TablesUpdateComponent, TablesDeleteDialogComponent, TablesDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JmenubackTablesModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
