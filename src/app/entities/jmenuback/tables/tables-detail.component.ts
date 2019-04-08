import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { ITables } from 'app/shared/model/jmenuback/tables.model';

@Component({
    selector: 'jhi-tables-detail',
    templateUrl: './tables-detail.component.html'
})
export class TablesDetailComponent implements OnInit {
    tables: ITables;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tables }) => {
            this.tables = tables;
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
