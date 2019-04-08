import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiDataUtils } from 'ng-jhipster';
import { ITables } from 'app/shared/model/jmenuback/tables.model';
import { TablesService } from './tables.service';

@Component({
    selector: 'jhi-tables-update',
    templateUrl: './tables-update.component.html'
})
export class TablesUpdateComponent implements OnInit {
    tables: ITables;
    isSaving: boolean;

    constructor(protected dataUtils: JhiDataUtils, protected tablesService: TablesService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ tables }) => {
            this.tables = tables;
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
        if (this.tables.id !== undefined) {
            this.subscribeToSaveResponse(this.tablesService.update(this.tables));
        } else {
            this.subscribeToSaveResponse(this.tablesService.create(this.tables));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITables>>) {
        result.subscribe((res: HttpResponse<ITables>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
