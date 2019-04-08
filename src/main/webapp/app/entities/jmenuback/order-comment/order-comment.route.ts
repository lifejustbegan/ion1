import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { OrderComment } from 'app/shared/model/jmenuback/order-comment.model';
import { OrderCommentService } from './order-comment.service';
import { OrderCommentComponent } from './order-comment.component';
import { OrderCommentDetailComponent } from './order-comment-detail.component';
import { OrderCommentUpdateComponent } from './order-comment-update.component';
import { OrderCommentDeletePopupComponent } from './order-comment-delete-dialog.component';
import { IOrderComment } from 'app/shared/model/jmenuback/order-comment.model';

@Injectable({ providedIn: 'root' })
export class OrderCommentResolve implements Resolve<IOrderComment> {
    constructor(private service: OrderCommentService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IOrderComment> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<OrderComment>) => response.ok),
                map((orderComment: HttpResponse<OrderComment>) => orderComment.body)
            );
        }
        return of(new OrderComment());
    }
}

export const orderCommentRoute: Routes = [
    {
        path: '',
        component: OrderCommentComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackOrderComment.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: OrderCommentDetailComponent,
        resolve: {
            orderComment: OrderCommentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackOrderComment.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: OrderCommentUpdateComponent,
        resolve: {
            orderComment: OrderCommentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackOrderComment.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: OrderCommentUpdateComponent,
        resolve: {
            orderComment: OrderCommentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackOrderComment.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const orderCommentPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: OrderCommentDeletePopupComponent,
        resolve: {
            orderComment: OrderCommentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackOrderComment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
