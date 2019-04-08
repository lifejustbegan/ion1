import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiDataUtils } from 'ng-jhipster';
import { IOrderComment } from 'app/shared/model/jmenuback/order-comment.model';
import { OrderCommentService } from './order-comment.service';

@Component({
    selector: 'jhi-order-comment-update',
    templateUrl: './order-comment-update.component.html'
})
export class OrderCommentUpdateComponent implements OnInit {
    orderComment: IOrderComment;
    isSaving: boolean;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected orderCommentService: OrderCommentService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
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

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.orderComment.id !== undefined) {
            this.subscribeToSaveResponse(this.orderCommentService.update(this.orderComment));
        } else {
            this.subscribeToSaveResponse(this.orderCommentService.create(this.orderComment));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrderComment>>) {
        result.subscribe((res: HttpResponse<IOrderComment>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
