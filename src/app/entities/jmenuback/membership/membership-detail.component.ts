import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IMembership } from 'app/shared/model/jmenuback/membership.model';

@Component({
    selector: 'jhi-membership-detail',
    templateUrl: './membership-detail.component.html'
})
export class MembershipDetailComponent implements OnInit {
    membership: IMembership;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ membership }) => {
            this.membership = membership;
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
