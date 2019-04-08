import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICharge } from 'app/shared/model/jmenuback/charge.model';

@Component({
    selector: 'jhi-charge-detail',
    templateUrl: './charge-detail.component.html'
})
export class ChargeDetailComponent implements OnInit {
    charge: ICharge;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ charge }) => {
            this.charge = charge;
        });
    }

    previousState() {
        window.history.back();
    }
}
