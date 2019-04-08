import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Charge } from 'app/shared/model/jmenuback/charge.model';
import { ChargeService } from './charge.service';
import { ChargeComponent } from './charge.component';
import { ChargeDetailComponent } from './charge-detail.component';
import { ChargeUpdateComponent } from './charge-update.component';
import { ChargeDeletePopupComponent } from './charge-delete-dialog.component';
import { ICharge } from 'app/shared/model/jmenuback/charge.model';

@Injectable({ providedIn: 'root' })
export class ChargeResolve implements Resolve<ICharge> {
    constructor(private service: ChargeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICharge> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Charge>) => response.ok),
                map((charge: HttpResponse<Charge>) => charge.body)
            );
        }
        return of(new Charge());
    }
}

export const chargeRoute: Routes = [
    {
        path: '',
        component: ChargeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackCharge.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ChargeDetailComponent,
        resolve: {
            charge: ChargeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackCharge.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ChargeUpdateComponent,
        resolve: {
            charge: ChargeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackCharge.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ChargeUpdateComponent,
        resolve: {
            charge: ChargeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackCharge.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const chargePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ChargeDeletePopupComponent,
        resolve: {
            charge: ChargeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackCharge.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
