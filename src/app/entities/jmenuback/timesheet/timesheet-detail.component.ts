import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITimesheet } from 'app/shared/model/jmenuback/timesheet.model';

@Component({
    selector: 'jhi-timesheet-detail',
    templateUrl: './timesheet-detail.component.html'
})
export class TimesheetDetailComponent implements OnInit {
    timesheet: ITimesheet;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ timesheet }) => {
            this.timesheet = timesheet;
        });
    }

    previousState() {
        window.history.back();
    }
}
