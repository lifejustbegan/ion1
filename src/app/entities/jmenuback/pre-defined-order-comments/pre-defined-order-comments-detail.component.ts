import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IPreDefinedOrderComments } from 'app/shared/model/jmenuback/pre-defined-order-comments.model';

@Component({
    selector: 'jhi-pre-defined-order-comments-detail',
    templateUrl: './pre-defined-order-comments-detail.component.html'
})
export class PreDefinedOrderCommentsDetailComponent implements OnInit {
    preDefinedOrderComments: IPreDefinedOrderComments;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ preDefinedOrderComments }) => {
            this.preDefinedOrderComments = preDefinedOrderComments;
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
