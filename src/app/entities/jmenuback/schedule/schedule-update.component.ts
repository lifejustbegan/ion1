import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { ISchedule } from 'app/shared/model/jmenuback/schedule.model';
import { ScheduleService } from './schedule.service';
import { IEmployee } from 'app/shared/model/jmenuback/employee.model';
import { EmployeeService } from 'app/entities/jmenuback/employee';
import { IBusiness } from 'app/shared/model/jmenuback/business.model';
import { BusinessService } from 'app/entities/jmenuback/business';

@Component({
    selector: 'jhi-schedule-update',
    templateUrl: './schedule-update.component.html'
})
export class ScheduleUpdateComponent implements OnInit {
    schedule: ISchedule;
    isSaving: boolean;

    employees: IEmployee[];

    businesses: IBusiness[];
    shiftStartTime: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected scheduleService: ScheduleService,
        protected employeeService: EmployeeService,
        protected businessService: BusinessService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ schedule }) => {
            this.schedule = schedule;
            this.shiftStartTime = this.schedule.shiftStartTime != null ? this.schedule.shiftStartTime.format(DATE_TIME_FORMAT) : null;
        });
        this.employeeService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IEmployee[]>) => mayBeOk.ok),
                map((response: HttpResponse<IEmployee[]>) => response.body)
            )
            .subscribe((res: IEmployee[]) => (this.employees = res), (res: HttpErrorResponse) => this.onError(res.message));
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
        this.schedule.shiftStartTime = this.shiftStartTime != null ? moment(this.shiftStartTime, DATE_TIME_FORMAT) : null;
        if (this.schedule.id !== undefined) {
            this.subscribeToSaveResponse(this.scheduleService.update(this.schedule));
        } else {
            this.subscribeToSaveResponse(this.scheduleService.create(this.schedule));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISchedule>>) {
        result.subscribe((res: HttpResponse<ISchedule>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
