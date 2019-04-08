import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MenuCategorie } from 'app/shared/model/jmenuback/menu-categorie.model';
import { MenuCategorieService } from './menu-categorie.service';
import { MenuCategorieComponent } from './menu-categorie.component';
import { MenuCategorieDetailComponent } from './menu-categorie-detail.component';
import { MenuCategorieUpdateComponent } from './menu-categorie-update.component';
import { MenuCategorieDeletePopupComponent } from './menu-categorie-delete-dialog.component';
import { IMenuCategorie } from 'app/shared/model/jmenuback/menu-categorie.model';

@Injectable({ providedIn: 'root' })
export class MenuCategorieResolve implements Resolve<IMenuCategorie> {
    constructor(private service: MenuCategorieService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMenuCategorie> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<MenuCategorie>) => response.ok),
                map((menuCategorie: HttpResponse<MenuCategorie>) => menuCategorie.body)
            );
        }
        return of(new MenuCategorie());
    }
}

export const menuCategorieRoute: Routes = [
    {
        path: '',
        component: MenuCategorieComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackMenuCategorie.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: MenuCategorieDetailComponent,
        resolve: {
            menuCategorie: MenuCategorieResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackMenuCategorie.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: MenuCategorieUpdateComponent,
        resolve: {
            menuCategorie: MenuCategorieResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackMenuCategorie.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: MenuCategorieUpdateComponent,
        resolve: {
            menuCategorie: MenuCategorieResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackMenuCategorie.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const menuCategoriePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: MenuCategorieDeletePopupComponent,
        resolve: {
            menuCategorie: MenuCategorieResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackMenuCategorie.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
