import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { IonSharedModule } from 'app/shared';
import {
    HappyHourComponent,
    HappyHourDetailComponent,
    HappyHourUpdateComponent,
    HappyHourDeletePopupComponent,
    HappyHourDeleteDialogComponent,
    happyHourRoute,
    happyHourPopupRoute
} from './';

const ENTITY_STATES = [...happyHourRoute, ...happyHourPopupRoute];

@NgModule({
    imports: [IonSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        HappyHourComponent,
        HappyHourDetailComponent,
        HappyHourUpdateComponent,
        HappyHourDeleteDialogComponent,
        HappyHourDeletePopupComponent
    ],
    entryComponents: [HappyHourComponent, HappyHourUpdateComponent, HappyHourDeleteDialogComponent, HappyHourDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JmenubackHappyHourModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
