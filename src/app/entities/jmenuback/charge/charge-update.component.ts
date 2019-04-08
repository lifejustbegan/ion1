import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ICharge } from 'app/shared/model/jmenuback/charge.model';
import { ChargeService } from './charge.service';

@Component({
    selector: 'jhi-charge-update',
    templateUrl: './charge-update.component.html'
})
export class ChargeUpdateComponent implements OnInit {
    charge: ICharge;
    isSaving: boolean;
    chargedTime: string;

    constructor(protected chargeService: ChargeService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ charge }) => {
            this.charge = charge;
            this.chargedTime = this.charge.chargedTime != null ? this.charge.chargedTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.charge.chargedTime = this.chargedTime != null ? moment(this.chargedTime, DATE_TIME_FORMAT) : null;
        if (this.charge.id !== undefined) {
            this.subscribeToSaveResponse(this.chargeService.update(this.charge));
        } else {
            this.subscribeToSaveResponse(this.chargeService.create(this.charge));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICharge>>) {
        result.subscribe((res: HttpResponse<ICharge>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
