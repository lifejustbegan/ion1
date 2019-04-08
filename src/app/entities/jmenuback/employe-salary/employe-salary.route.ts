import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EmployeSalary } from 'app/shared/model/jmenuback/employe-salary.model';
import { EmployeSalaryService } from './employe-salary.service';
import { EmployeSalaryComponent } from './employe-salary.component';
import { EmployeSalaryDetailComponent } from './employe-salary-detail.component';
import { EmployeSalaryUpdateComponent } from './employe-salary-update.component';
import { EmployeSalaryDeletePopupComponent } from './employe-salary-delete-dialog.component';
import { IEmployeSalary } from 'app/shared/model/jmenuback/employe-salary.model';

@Injectable({ providedIn: 'root' })
export class EmployeSalaryResolve implements Resolve<IEmployeSalary> {
    constructor(private service: EmployeSalaryService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEmployeSalary> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<EmployeSalary>) => response.ok),
                map((employeSalary: HttpResponse<EmployeSalary>) => employeSalary.body)
            );
        }
        return of(new EmployeSalary());
    }
}

export const employeSalaryRoute: Routes = [
    {
        path: '',
        component: EmployeSalaryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackEmployeSalary.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: EmployeSalaryDetailComponent,
        resolve: {
            employeSalary: EmployeSalaryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackEmployeSalary.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: EmployeSalaryUpdateComponent,
        resolve: {
            employeSalary: EmployeSalaryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackEmployeSalary.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: EmployeSalaryUpdateComponent,
        resolve: {
            employeSalary: EmployeSalaryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackEmployeSalary.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const employeSalaryPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: EmployeSalaryDeletePopupComponent,
        resolve: {
            employeSalary: EmployeSalaryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackEmployeSalary.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
