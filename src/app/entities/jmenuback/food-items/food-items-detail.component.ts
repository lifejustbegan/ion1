import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IFoodItems } from 'app/shared/model/jmenuback/food-items.model';

@Component({
    selector: 'jhi-food-items-detail',
    templateUrl: './food-items-detail.component.html'
})
export class FoodItemsDetailComponent implements OnInit {
    foodItems: IFoodItems;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
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
    previousState() {
        window.history.back();
    }
}
