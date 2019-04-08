import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { IonSharedModule } from 'app/shared';
import {
    ChargeComponent,
    ChargeDetailComponent,
    ChargeUpdateComponent,
    ChargeDeletePopupComponent,
    ChargeDeleteDialogComponent,
    chargeRoute,
    chargePopupRoute
} from './';

const ENTITY_STATES = [...chargeRoute, ...chargePopupRoute];

@NgModule({
    imports: [IonSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [ChargeComponent, ChargeDetailComponent, ChargeUpdateComponent, ChargeDeleteDialogComponent, ChargeDeletePopupComponent],
    entryComponents: [ChargeComponent, ChargeUpdateComponent, ChargeDeleteDialogComponent, ChargeDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JmenubackChargeModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
