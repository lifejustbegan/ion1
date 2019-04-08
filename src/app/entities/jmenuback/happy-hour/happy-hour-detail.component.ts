import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHappyHour } from 'app/shared/model/jmenuback/happy-hour.model';

@Component({
    selector: 'jhi-happy-hour-detail',
    templateUrl: './happy-hour-detail.component.html'
})
export class HappyHourDetailComponent implements OnInit {
    happyHour: IHappyHour;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ happyHour }) => {
            this.happyHour = happyHour;
        });
    }

    previousState() {
        window.history.back();
    }
}
