import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IBusiness } from 'app/shared/model/jmenuback/business.model';
import { BusinessService } from './business.service';
import { IEmployee } from 'app/shared/model/jmenuback/employee.model';
import { EmployeeService } from 'app/entities/jmenuback/employee';

@Component({
    selector: 'jhi-business-update',
    templateUrl: './business-update.component.html'
})
export class BusinessUpdateComponent implements OnInit {
    business: IBusiness;
    isSaving: boolean;

    employees: IEmployee[];
    signupDate: string;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected businessService: BusinessService,
        protected employeeService: EmployeeService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ business }) => {
            this.business = business;
            this.signupDate = this.business.signupDate != null ? this.business.signupDate.format(DATE_TIME_FORMAT) : null;
        });
        this.employeeService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IEmployee[]>) => mayBeOk.ok),
                map((response: HttpResponse<IEmployee[]>) => response.body)
            )
            .subscribe((res: IEmployee[]) => (this.employees = res), (res: HttpErrorResponse) => this.onError(res.message));
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
        this.business.signupDate = this.signupDate != null ? moment(this.signupDate, DATE_TIME_FORMAT) : null;
        if (this.business.id !== undefined) {
            this.subscribeToSaveResponse(this.businessService.update(this.business));
        } else {
            this.subscribeToSaveResponse(this.businessService.create(this.business));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IBusiness>>) {
        result.subscribe((res: HttpResponse<IBusiness>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackEmployeeById(index: number, item: IEmployee) {
        return item.id;
    }
}
