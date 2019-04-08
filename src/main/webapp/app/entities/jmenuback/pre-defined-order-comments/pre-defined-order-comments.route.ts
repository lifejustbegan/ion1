import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PreDefinedOrderComments } from 'app/shared/model/jmenuback/pre-defined-order-comments.model';
import { PreDefinedOrderCommentsService } from './pre-defined-order-comments.service';
import { PreDefinedOrderCommentsComponent } from './pre-defined-order-comments.component';
import { PreDefinedOrderCommentsDetailComponent } from './pre-defined-order-comments-detail.component';
import { PreDefinedOrderCommentsUpdateComponent } from './pre-defined-order-comments-update.component';
import { PreDefinedOrderCommentsDeletePopupComponent } from './pre-defined-order-comments-delete-dialog.component';
import { IPreDefinedOrderComments } from 'app/shared/model/jmenuback/pre-defined-order-comments.model';

@Injectable({ providedIn: 'root' })
export class PreDefinedOrderCommentsResolve implements Resolve<IPreDefinedOrderComments> {
    constructor(private service: PreDefinedOrderCommentsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPreDefinedOrderComments> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<PreDefinedOrderComments>) => response.ok),
                map((preDefinedOrderComments: HttpResponse<PreDefinedOrderComments>) => preDefinedOrderComments.body)
            );
        }
        return of(new PreDefinedOrderComments());
    }
}

export const preDefinedOrderCommentsRoute: Routes = [
    {
        path: '',
        component: PreDefinedOrderCommentsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackPreDefinedOrderComments.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: PreDefinedOrderCommentsDetailComponent,
        resolve: {
            preDefinedOrderComments: PreDefinedOrderCommentsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackPreDefinedOrderComments.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: PreDefinedOrderCommentsUpdateComponent,
        resolve: {
            preDefinedOrderComments: PreDefinedOrderCommentsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackPreDefinedOrderComments.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: PreDefinedOrderCommentsUpdateComponent,
        resolve: {
            preDefinedOrderComments: PreDefinedOrderCommentsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackPreDefinedOrderComments.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const preDefinedOrderCommentsPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: PreDefinedOrderCommentsDeletePopupComponent,
        resolve: {
            preDefinedOrderComments: PreDefinedOrderCommentsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackPreDefinedOrderComments.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
