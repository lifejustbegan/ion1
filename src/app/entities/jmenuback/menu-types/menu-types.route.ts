import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MenuTypes } from 'app/shared/model/jmenuback/menu-types.model';
import { MenuTypesService } from './menu-types.service';
import { MenuTypesComponent } from './menu-types.component';
import { MenuTypesDetailComponent } from './menu-types-detail.component';
import { MenuTypesUpdateComponent } from './menu-types-update.component';
import { MenuTypesDeletePopupComponent } from './menu-types-delete-dialog.component';
import { IMenuTypes } from 'app/shared/model/jmenuback/menu-types.model';

@Injectable({ providedIn: 'root' })
export class MenuTypesResolve implements Resolve<IMenuTypes> {
    constructor(private service: MenuTypesService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMenuTypes> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<MenuTypes>) => response.ok),
                map((menuTypes: HttpResponse<MenuTypes>) => menuTypes.body)
            );
        }
        return of(new MenuTypes());
    }
}

export const menuTypesRoute: Routes = [
    {
        path: '',
        component: MenuTypesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackMenuTypes.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: MenuTypesDetailComponent,
        resolve: {
            menuTypes: MenuTypesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackMenuTypes.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: MenuTypesUpdateComponent,
        resolve: {
            menuTypes: MenuTypesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackMenuTypes.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: MenuTypesUpdateComponent,
        resolve: {
            menuTypes: MenuTypesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackMenuTypes.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const menuTypesPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: MenuTypesDeletePopupComponent,
        resolve: {
            menuTypes: MenuTypesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackMenuTypes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
