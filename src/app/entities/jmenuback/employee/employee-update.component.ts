import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IEmployee } from 'app/shared/model/jmenuback/employee.model';
import { EmployeeService } from './employee.service';
import { IBusiness } from 'app/shared/model/jmenuback/business.model';
import { BusinessService } from 'app/entities/jmenuback/business';
import { ISchedule } from 'app/shared/model/jmenuback/schedule.model';
import { ScheduleService } from 'app/entities/jmenuback/schedule';

@Component({
    selector: 'jhi-employee-update',
    templateUrl: './employee-update.component.html'
})
export class EmployeeUpdateComponent implements OnInit {
    employee: IEmployee;
    isSaving: boolean;

    schedules: ISchedule[];

    businesses: IBusiness[];
    hireDate: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected employeeService: EmployeeService,
        protected businessService: BusinessService,
        protected scheduleService: ScheduleService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ employee }) => {
            this.employee = employee;
            this.hireDate = this.employee.hireDate != null ? this.employee.hireDate.format(DATE_TIME_FORMAT) : null;
        });
        this.scheduleService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ISchedule[]>) => mayBeOk.ok),
                map((response: HttpResponse<ISchedule[]>) => response.body)
            )
            .subscribe((res: ISchedule[]) => (this.schedules = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.businessService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IBusiness[]>) => mayBeOk.ok),
                map((response: HttpResponse<IBusiness[]>) => response.body)
            )
            .subscribe((res: IBusiness[]) => (this.businesses = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.employee.hireDate = this.hireDate != null ? moment(this.hireDate, DATE_TIME_FORMAT) : null;
        if (this.employee.id !== undefined) {
            this.subscribeToSaveResponse(this.employeeService.update(this.employee));
        } else {
            this.subscribeToSaveResponse(this.employeeService.create(this.employee));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmployee>>) {
        result.subscribe((res: HttpResponse<IEmployee>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackScheduleById(index: number, item: ISchedule) {
        return item.id;
    }

    trackBusinessById(index: number, item: IBusiness) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
