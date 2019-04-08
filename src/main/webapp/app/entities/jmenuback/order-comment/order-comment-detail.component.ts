import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IOrderComment } from 'app/shared/model/jmenuback/order-comment.model';

@Component({
    selector: 'jhi-order-comment-detail',
    templateUrl: './order-comment-detail.component.html'
})
export class OrderCommentDetailComponent implements OnInit {
    orderComment: IOrderComment;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ orderComment }) => {
            this.orderComment = orderComment;
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
