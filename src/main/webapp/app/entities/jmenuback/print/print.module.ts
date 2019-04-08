import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { IonSharedModule } from 'app/shared';
import {
    PrintComponent,
    PrintDetailComponent,
    PrintUpdateComponent,
    PrintDeletePopupComponent,
    PrintDeleteDialogComponent,
    printRoute,
    printPopupRoute
} from './';

const ENTITY_STATES = [...printRoute, ...printPopupRoute];

@NgModule({
    imports: [IonSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [PrintComponent, PrintDetailComponent, PrintUpdateComponent, PrintDeleteDialogComponent, PrintDeletePopupComponent],
    entryComponents: [PrintComponent, PrintUpdateComponent, PrintDeleteDialogComponent, PrintDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JmenubackPrintModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
