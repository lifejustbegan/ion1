import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiDataUtils } from 'ng-jhipster';
import { IMenuCategorie } from 'app/shared/model/jmenuback/menu-categorie.model';
import { MenuCategorieService } from './menu-categorie.service';

@Component({
    selector: 'jhi-menu-categorie-update',
    templateUrl: './menu-categorie-update.component.html'
})
export class MenuCategorieUpdateComponent implements OnInit {
    menuCategorie: IMenuCategorie;
    isSaving: boolean;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected menuCategorieService: MenuCategorieService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ menuCategorie }) => {
            this.menuCategorie = menuCategorie;
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
        if (this.menuCategorie.id !== undefined) {
            this.subscribeToSaveResponse(this.menuCategorieService.update(this.menuCategorie));
        } else {
            this.subscribeToSaveResponse(this.menuCategorieService.create(this.menuCategorie));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMenuCategorie>>) {
        result.subscribe((res: HttpResponse<IMenuCategorie>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
