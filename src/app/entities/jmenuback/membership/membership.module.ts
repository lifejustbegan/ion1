import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { IonSharedModule } from 'app/shared';
import {
    MembershipComponent,
    MembershipDetailComponent,
    MembershipUpdateComponent,
    MembershipDeletePopupComponent,
    MembershipDeleteDialogComponent,
    membershipRoute,
    membershipPopupRoute
} from './';

const ENTITY_STATES = [...membershipRoute, ...membershipPopupRoute];

@NgModule({
    imports: [IonSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MembershipComponent,
        MembershipDetailComponent,
        MembershipUpdateComponent,
        MembershipDeleteDialogComponent,
        MembershipDeletePopupComponent
    ],
    entryComponents: [MembershipComponent, MembershipUpdateComponent, MembershipDeleteDialogComponent, MembershipDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JmenubackMembershipModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
