import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IPrint } from 'app/shared/model/jmenuback/print.model';
import { PrintService } from './print.service';

@Component({
    selector: 'jhi-print-update',
    templateUrl: './print-update.component.html'
})
export class PrintUpdateComponent implements OnInit {
    print: IPrint;
    isSaving: boolean;
    printedTime: string;

    constructor(protected printService: PrintService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ print }) => {
            this.print = print;
            this.printedTime = this.print.printedTime != null ? this.print.printedTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.print.printedTime = this.printedTime != null ? moment(this.printedTime, DATE_TIME_FORMAT) : null;
        if (this.print.id !== undefined) {
            this.subscribeToSaveResponse(this.printService.update(this.print));
        } else {
            this.subscribeToSaveResponse(this.printService.create(this.print));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPrint>>) {
        result.subscribe((res: HttpResponse<IPrint>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
