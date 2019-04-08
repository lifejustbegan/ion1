import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EmployeeComment } from 'app/shared/model/jmenuback/employee-comment.model';
import { EmployeeCommentService } from './employee-comment.service';
import { EmployeeCommentComponent } from './employee-comment.component';
import { EmployeeCommentDetailComponent } from './employee-comment-detail.component';
import { EmployeeCommentUpdateComponent } from './employee-comment-update.component';
import { EmployeeCommentDeletePopupComponent } from './employee-comment-delete-dialog.component';
import { IEmployeeComment } from 'app/shared/model/jmenuback/employee-comment.model';

@Injectable({ providedIn: 'root' })
export class EmployeeCommentResolve implements Resolve<IEmployeeComment> {
    constructor(private service: EmployeeCommentService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEmployeeComment> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<EmployeeComment>) => response.ok),
                map((employeeComment: HttpResponse<EmployeeComment>) => employeeComment.body)
            );
        }
        return of(new EmployeeComment());
    }
}

export const employeeCommentRoute: Routes = [
    {
        path: '',
        component: EmployeeCommentComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackEmployeeComment.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: EmployeeCommentDetailComponent,
        resolve: {
            employeeComment: EmployeeCommentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackEmployeeComment.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: EmployeeCommentUpdateComponent,
        resolve: {
            employeeComment: EmployeeCommentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackEmployeeComment.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: EmployeeCommentUpdateComponent,
        resolve: {
            employeeComment: EmployeeCommentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackEmployeeComment.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const employeeCommentPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: EmployeeCommentDeletePopupComponent,
        resolve: {
            employeeComment: EmployeeCommentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackEmployeeComment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
