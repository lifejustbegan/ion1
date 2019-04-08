import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiDataUtils } from 'ng-jhipster';
import { IFoodItems } from 'app/shared/model/jmenuback/food-items.model';
import { FoodItemsService } from './food-items.service';

@Component({
    selector: 'jhi-food-items-update',
    templateUrl: './food-items-update.component.html'
})
export class FoodItemsUpdateComponent implements OnInit {
    foodItems: IFoodItems;
    isSaving: boolean;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected foodItemsService: FoodItemsService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ foodItems }) => {
            this.foodItems = foodItems;
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
        if (this.foodItems.id !== undefined) {
            this.subscribeToSaveResponse(this.foodItemsService.update(this.foodItems));
        } else {
            this.subscribeToSaveResponse(this.foodItemsService.create(this.foodItems));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IFoodItems>>) {
        result.subscribe((res: HttpResponse<IFoodItems>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
