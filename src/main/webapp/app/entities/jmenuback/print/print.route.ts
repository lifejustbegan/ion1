import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Print } from 'app/shared/model/jmenuback/print.model';
import { PrintService } from './print.service';
import { PrintComponent } from './print.component';
import { PrintDetailComponent } from './print-detail.component';
import { PrintUpdateComponent } from './print-update.component';
import { PrintDeletePopupComponent } from './print-delete-dialog.component';
import { IPrint } from 'app/shared/model/jmenuback/print.model';

@Injectable({ providedIn: 'root' })
export class PrintResolve implements Resolve<IPrint> {
    constructor(private service: PrintService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPrint> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Print>) => response.ok),
                map((print: HttpResponse<Print>) => print.body)
            );
        }
        return of(new Print());
    }
}

export const printRoute: Routes = [
    {
        path: '',
        component: PrintComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackPrint.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: PrintDetailComponent,
        resolve: {
            print: PrintResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackPrint.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: PrintUpdateComponent,
        resolve: {
            print: PrintResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackPrint.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: PrintUpdateComponent,
        resolve: {
            print: PrintResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackPrint.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const printPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: PrintDeletePopupComponent,
        resolve: {
            print: PrintResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackPrint.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
