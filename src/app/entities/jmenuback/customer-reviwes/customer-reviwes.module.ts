import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { IonSharedModule } from 'app/shared';
import {
    CustomerReviwesComponent,
    CustomerReviwesDetailComponent,
    CustomerReviwesUpdateComponent,
    CustomerReviwesDeletePopupComponent,
    CustomerReviwesDeleteDialogComponent,
    customerReviwesRoute,
    customerReviwesPopupRoute
} from './';

const ENTITY_STATES = [...customerReviwesRoute, ...customerReviwesPopupRoute];

@NgModule({
    imports: [IonSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CustomerReviwesComponent,
        CustomerReviwesDetailComponent,
        CustomerReviwesUpdateComponent,
        CustomerReviwesDeleteDialogComponent,
        CustomerReviwesDeletePopupComponent
    ],
    entryComponents: [
        CustomerReviwesComponent,
        CustomerReviwesUpdateComponent,
        CustomerReviwesDeleteDialogComponent,
        CustomerReviwesDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JmenubackCustomerReviwesModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
