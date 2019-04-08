import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IHappyHour } from 'app/shared/model/jmenuback/happy-hour.model';
import { HappyHourService } from './happy-hour.service';

@Component({
    selector: 'jhi-happy-hour-update',
    templateUrl: './happy-hour-update.component.html'
})
export class HappyHourUpdateComponent implements OnInit {
    happyHour: IHappyHour;
    isSaving: boolean;

    constructor(protected happyHourService: HappyHourService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ happyHour }) => {
            this.happyHour = happyHour;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.happyHour.id !== undefined) {
            this.subscribeToSaveResponse(this.happyHourService.update(this.happyHour));
        } else {
            this.subscribeToSaveResponse(this.happyHourService.create(this.happyHour));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IHappyHour>>) {
        result.subscribe((res: HttpResponse<IHappyHour>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
