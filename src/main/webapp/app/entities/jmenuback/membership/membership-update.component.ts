import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IMembership } from 'app/shared/model/jmenuback/membership.model';
import { MembershipService } from './membership.service';
import { IBusiness } from 'app/shared/model/jmenuback/business.model';
import { BusinessService } from 'app/entities/jmenuback/business';

@Component({
    selector: 'jhi-membership-update',
    templateUrl: './membership-update.component.html'
})
export class MembershipUpdateComponent implements OnInit {
    membership: IMembership;
    isSaving: boolean;

    businesses: IBusiness[];

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected membershipService: MembershipService,
        protected businessService: BusinessService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ membership }) => {
            this.membership = membership;
        });
        this.businessService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IBusiness[]>) => mayBeOk.ok),
                map((response: HttpResponse<IBusiness[]>) => response.body)
            )
            .subscribe((res: IBusiness[]) => (this.businesses = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.membership.id !== undefined) {
            this.subscribeToSaveResponse(this.membershipService.update(this.membership));
        } else {
            this.subscribeToSaveResponse(this.membershipService.create(this.membership));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMembership>>) {
        result.subscribe((res: HttpResponse<IMembership>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackBusinessById(index: number, item: IBusiness) {
        return item.id;
    }
}
