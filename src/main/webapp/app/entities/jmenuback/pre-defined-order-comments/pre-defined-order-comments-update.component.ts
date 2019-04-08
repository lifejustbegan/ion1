import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiDataUtils } from 'ng-jhipster';
import { IPreDefinedOrderComments } from 'app/shared/model/jmenuback/pre-defined-order-comments.model';
import { PreDefinedOrderCommentsService } from './pre-defined-order-comments.service';

@Component({
    selector: 'jhi-pre-defined-order-comments-update',
    templateUrl: './pre-defined-order-comments-update.component.html'
})
export class PreDefinedOrderCommentsUpdateComponent implements OnInit {
    preDefinedOrderComments: IPreDefinedOrderComments;
    isSaving: boolean;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected preDefinedOrderCommentsService: PreDefinedOrderCommentsService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
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

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.preDefinedOrderComments.id !== undefined) {
            this.subscribeToSaveResponse(this.preDefinedOrderCommentsService.update(this.preDefinedOrderComments));
        } else {
            this.subscribeToSaveResponse(this.preDefinedOrderCommentsService.create(this.preDefinedOrderComments));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPreDefinedOrderComments>>) {
        result.subscribe(
            (res: HttpResponse<IPreDefinedOrderComments>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
