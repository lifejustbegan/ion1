import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { IonSharedModule } from 'app/shared';
import {
    TimesheetComponent,
    TimesheetDetailComponent,
    TimesheetUpdateComponent,
    TimesheetDeletePopupComponent,
    TimesheetDeleteDialogComponent,
    timesheetRoute,
    timesheetPopupRoute
} from './';

const ENTITY_STATES = [...timesheetRoute, ...timesheetPopupRoute];

@NgModule({
    imports: [IonSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TimesheetComponent,
        TimesheetDetailComponent,
        TimesheetUpdateComponent,
        TimesheetDeleteDialogComponent,
        TimesheetDeletePopupComponent
    ],
    entryComponents: [TimesheetComponent, TimesheetUpdateComponent, TimesheetDeleteDialogComponent, TimesheetDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JmenubackTimesheetModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
