import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPrint } from 'app/shared/model/jmenuback/print.model';

@Component({
    selector: 'jhi-print-detail',
    templateUrl: './print-detail.component.html'
})
export class PrintDetailComponent implements OnInit {
    print: IPrint;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ print }) => {
            this.print = print;
        });
    }

    previousState() {
        window.history.back();
    }
}
