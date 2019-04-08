import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { ITimesheet } from 'app/shared/model/jmenuback/timesheet.model';
import { TimesheetService } from './timesheet.service';
import { IEmployee } from 'app/shared/model/jmenuback/employee.model';
import { EmployeeService } from 'app/entities/jmenuback/employee';
import { IBusiness } from 'app/shared/model/jmenuback/business.model';
import { BusinessService } from 'app/entities/jmenuback/business';

@Component({
    selector: 'jhi-timesheet-update',
    templateUrl: './timesheet-update.component.html'
})
export class TimesheetUpdateComponent implements OnInit {
    timesheet: ITimesheet;
    isSaving: boolean;

    employees: IEmployee[];

    businesses: IBusiness[];
    dateTime: string;
    punchInTime: string;
    punchOutTime: string;
    breakTimeOut: string;
    breakTimeIn: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected timesheetService: TimesheetService,
        protected employeeService: EmployeeService,
        protected businessService: BusinessService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ timesheet }) => {
            this.timesheet = timesheet;
            this.dateTime = this.timesheet.dateTime != null ? this.timesheet.dateTime.format(DATE_TIME_FORMAT) : null;
            this.punchInTime = this.timesheet.punchInTime != null ? this.timesheet.punchInTime.format(DATE_TIME_FORMAT) : null;
            this.punchOutTime = this.timesheet.punchOutTime != null ? this.timesheet.punchOutTime.format(DATE_TIME_FORMAT) : null;
            this.breakTimeOut = this.timesheet.breakTimeOut != null ? this.timesheet.breakTimeOut.format(DATE_TIME_FORMAT) : null;
            this.breakTimeIn = this.timesheet.breakTimeIn != null ? this.timesheet.breakTimeIn.format(DATE_TIME_FORMAT) : null;
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
        this.timesheet.dateTime = this.dateTime != null ? moment(this.dateTime, DATE_TIME_FORMAT) : null;
        this.timesheet.punchInTime = this.punchInTime != null ? moment(this.punchInTime, DATE_TIME_FORMAT) : null;
        this.timesheet.punchOutTime = this.punchOutTime != null ? moment(this.punchOutTime, DATE_TIME_FORMAT) : null;
        this.timesheet.breakTimeOut = this.breakTimeOut != null ? moment(this.breakTimeOut, DATE_TIME_FORMAT) : null;
        this.timesheet.breakTimeIn = this.breakTimeIn != null ? moment(this.breakTimeIn, DATE_TIME_FORMAT) : null;
        if (this.timesheet.id !== undefined) {
            this.subscribeToSaveResponse(this.timesheetService.update(this.timesheet));
        } else {
            this.subscribeToSaveResponse(this.timesheetService.create(this.timesheet));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITimesheet>>) {
        result.subscribe((res: HttpResponse<ITimesheet>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
}
