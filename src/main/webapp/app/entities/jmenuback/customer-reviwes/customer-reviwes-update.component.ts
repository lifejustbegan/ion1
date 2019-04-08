import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils } from 'ng-jhipster';
import { ICustomerReviwes } from 'app/shared/model/jmenuback/customer-reviwes.model';
import { CustomerReviwesService } from './customer-reviwes.service';

@Component({
    selector: 'jhi-customer-reviwes-update',
    templateUrl: './customer-reviwes-update.component.html'
})
export class CustomerReviwesUpdateComponent implements OnInit {
    customerReviwes: ICustomerReviwes;
    isSaving: boolean;
    createdDate: string;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected customerReviwesService: CustomerReviwesService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ customerReviwes }) => {
            this.customerReviwes = customerReviwes;
            this.createdDate = this.customerReviwes.createdDate != null ? this.customerReviwes.createdDate.format(DATE_TIME_FORMAT) : null;
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
        this.customerReviwes.createdDate = this.createdDate != null ? moment(this.createdDate, DATE_TIME_FORMAT) : null;
        if (this.customerReviwes.id !== undefined) {
            this.subscribeToSaveResponse(this.customerReviwesService.update(this.customerReviwes));
        } else {
            this.subscribeToSaveResponse(this.customerReviwesService.create(this.customerReviwes));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICustomerReviwes>>) {
        result.subscribe((res: HttpResponse<ICustomerReviwes>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
