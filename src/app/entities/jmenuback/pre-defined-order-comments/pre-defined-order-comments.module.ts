import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { IonSharedModule } from 'app/shared';
import {
    PreDefinedOrderCommentsComponent,
    PreDefinedOrderCommentsDetailComponent,
    PreDefinedOrderCommentsUpdateComponent,
    PreDefinedOrderCommentsDeletePopupComponent,
    PreDefinedOrderCommentsDeleteDialogComponent,
    preDefinedOrderCommentsRoute,
    preDefinedOrderCommentsPopupRoute
} from './';

const ENTITY_STATES = [...preDefinedOrderCommentsRoute, ...preDefinedOrderCommentsPopupRoute];

@NgModule({
    imports: [IonSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PreDefinedOrderCommentsComponent,
        PreDefinedOrderCommentsDetailComponent,
        PreDefinedOrderCommentsUpdateComponent,
        PreDefinedOrderCommentsDeleteDialogComponent,
        PreDefinedOrderCommentsDeletePopupComponent
    ],
    entryComponents: [
        PreDefinedOrderCommentsComponent,
        PreDefinedOrderCommentsUpdateComponent,
        PreDefinedOrderCommentsDeleteDialogComponent,
        PreDefinedOrderCommentsDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JmenubackPreDefinedOrderCommentsModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
