import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { IonSharedModule } from 'app/shared';
import {
    OrderCommentComponent,
    OrderCommentDetailComponent,
    OrderCommentUpdateComponent,
    OrderCommentDeletePopupComponent,
    OrderCommentDeleteDialogComponent,
    orderCommentRoute,
    orderCommentPopupRoute
} from './';

const ENTITY_STATES = [...orderCommentRoute, ...orderCommentPopupRoute];

@NgModule({
    imports: [IonSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        OrderCommentComponent,
        OrderCommentDetailComponent,
        OrderCommentUpdateComponent,
        OrderCommentDeleteDialogComponent,
        OrderCommentDeletePopupComponent
    ],
    entryComponents: [
        OrderCommentComponent,
        OrderCommentUpdateComponent,
        OrderCommentDeleteDialogComponent,
        OrderCommentDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JmenubackOrderCommentModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
