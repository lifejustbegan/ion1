import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CustomerReviwes } from 'app/shared/model/jmenuback/customer-reviwes.model';
import { CustomerReviwesService } from './customer-reviwes.service';
import { CustomerReviwesComponent } from './customer-reviwes.component';
import { CustomerReviwesDetailComponent } from './customer-reviwes-detail.component';
import { CustomerReviwesUpdateComponent } from './customer-reviwes-update.component';
import { CustomerReviwesDeletePopupComponent } from './customer-reviwes-delete-dialog.component';
import { ICustomerReviwes } from 'app/shared/model/jmenuback/customer-reviwes.model';

@Injectable({ providedIn: 'root' })
export class CustomerReviwesResolve implements Resolve<ICustomerReviwes> {
    constructor(private service: CustomerReviwesService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICustomerReviwes> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<CustomerReviwes>) => response.ok),
                map((customerReviwes: HttpResponse<CustomerReviwes>) => customerReviwes.body)
            );
        }
        return of(new CustomerReviwes());
    }
}

export const customerReviwesRoute: Routes = [
    {
        path: '',
        component: CustomerReviwesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackCustomerReviwes.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: CustomerReviwesDetailComponent,
        resolve: {
            customerReviwes: CustomerReviwesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackCustomerReviwes.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: CustomerReviwesUpdateComponent,
        resolve: {
            customerReviwes: CustomerReviwesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackCustomerReviwes.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: CustomerReviwesUpdateComponent,
        resolve: {
            customerReviwes: CustomerReviwesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackCustomerReviwes.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const customerReviwesPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: CustomerReviwesDeletePopupComponent,
        resolve: {
            customerReviwes: CustomerReviwesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackCustomerReviwes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
