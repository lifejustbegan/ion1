import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiDataUtils } from 'ng-jhipster';
import { IMenuTypes } from 'app/shared/model/jmenuback/menu-types.model';
import { MenuTypesService } from './menu-types.service';

@Component({
    selector: 'jhi-menu-types-update',
    templateUrl: './menu-types-update.component.html'
})
export class MenuTypesUpdateComponent implements OnInit {
    menuTypes: IMenuTypes;
    isSaving: boolean;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected menuTypesService: MenuTypesService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ menuTypes }) => {
            this.menuTypes = menuTypes;
        });
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
        if (this.menuTypes.id !== undefined) {
            this.subscribeToSaveResponse(this.menuTypesService.update(this.menuTypes));
        } else {
            this.subscribeToSaveResponse(this.menuTypesService.create(this.menuTypes));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMenuTypes>>) {
        result.subscribe((res: HttpResponse<IMenuTypes>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
