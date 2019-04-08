import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IMenuTypes } from 'app/shared/model/jmenuback/menu-types.model';

@Component({
    selector: 'jhi-menu-types-detail',
    templateUrl: './menu-types-detail.component.html'
})
export class MenuTypesDetailComponent implements OnInit {
    menuTypes: IMenuTypes;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ menuTypes }) => {
            this.menuTypes = menuTypes;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }
}
