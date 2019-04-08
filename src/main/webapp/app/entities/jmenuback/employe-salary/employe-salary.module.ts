import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { IonSharedModule } from 'app/shared';
import {
    EmployeSalaryComponent,
    EmployeSalaryDetailComponent,
    EmployeSalaryUpdateComponent,
    EmployeSalaryDeletePopupComponent,
    EmployeSalaryDeleteDialogComponent,
    employeSalaryRoute,
    employeSalaryPopupRoute
} from './';

const ENTITY_STATES = [...employeSalaryRoute, ...employeSalaryPopupRoute];

@NgModule({
    imports: [IonSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EmployeSalaryComponent,
        EmployeSalaryDetailComponent,
        EmployeSalaryUpdateComponent,
        EmployeSalaryDeleteDialogComponent,
        EmployeSalaryDeletePopupComponent
    ],
    entryComponents: [
        EmployeSalaryComponent,
        EmployeSalaryUpdateComponent,
        EmployeSalaryDeleteDialogComponent,
        EmployeSalaryDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JmenubackEmployeSalaryModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
