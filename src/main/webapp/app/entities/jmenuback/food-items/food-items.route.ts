import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FoodItems } from 'app/shared/model/jmenuback/food-items.model';
import { FoodItemsService } from './food-items.service';
import { FoodItemsComponent } from './food-items.component';
import { FoodItemsDetailComponent } from './food-items-detail.component';
import { FoodItemsUpdateComponent } from './food-items-update.component';
import { FoodItemsDeletePopupComponent } from './food-items-delete-dialog.component';
import { IFoodItems } from 'app/shared/model/jmenuback/food-items.model';

@Injectable({ providedIn: 'root' })
export class FoodItemsResolve implements Resolve<IFoodItems> {
    constructor(private service: FoodItemsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFoodItems> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<FoodItems>) => response.ok),
                map((foodItems: HttpResponse<FoodItems>) => foodItems.body)
            );
        }
        return of(new FoodItems());
    }
}

export const foodItemsRoute: Routes = [
    {
        path: '',
        component: FoodItemsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackFoodItems.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: FoodItemsDetailComponent,
        resolve: {
            foodItems: FoodItemsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackFoodItems.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: FoodItemsUpdateComponent,
        resolve: {
            foodItems: FoodItemsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackFoodItems.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: FoodItemsUpdateComponent,
        resolve: {
            foodItems: FoodItemsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackFoodItems.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const foodItemsPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: FoodItemsDeletePopupComponent,
        resolve: {
            foodItems: FoodItemsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackFoodItems.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
