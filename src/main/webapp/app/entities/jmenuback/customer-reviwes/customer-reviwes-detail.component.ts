import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { ICustomerReviwes } from 'app/shared/model/jmenuback/customer-reviwes.model';

@Component({
    selector: 'jhi-customer-reviwes-detail',
    templateUrl: './customer-reviwes-detail.component.html'
})
export class CustomerReviwesDetailComponent implements OnInit {
    customerReviwes: ICustomerReviwes;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ customerReviwes }) => {
            this.customerReviwes = customerReviwes;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }
}
