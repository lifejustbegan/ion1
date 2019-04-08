import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { IonSharedModule } from 'app/shared';
import {
    EmployeeCommentComponent,
    EmployeeCommentDetailComponent,
    EmployeeCommentUpdateComponent,
    EmployeeCommentDeletePopupComponent,
    EmployeeCommentDeleteDialogComponent,
    employeeCommentRoute,
    employeeCommentPopupRoute
} from './';

const ENTITY_STATES = [...employeeCommentRoute, ...employeeCommentPopupRoute];

@NgModule({
    imports: [IonSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EmployeeCommentComponent,
        EmployeeCommentDetailComponent,
        EmployeeCommentUpdateComponent,
        EmployeeCommentDeleteDialogComponent,
        EmployeeCommentDeletePopupComponent
    ],
    entryComponents: [
        EmployeeCommentComponent,
        EmployeeCommentUpdateComponent,
        EmployeeCommentDeleteDialogComponent,
        EmployeeCommentDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JmenubackEmployeeCommentModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
