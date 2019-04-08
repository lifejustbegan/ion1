import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { HappyHour } from 'app/shared/model/jmenuback/happy-hour.model';
import { HappyHourService } from './happy-hour.service';
import { HappyHourComponent } from './happy-hour.component';
import { HappyHourDetailComponent } from './happy-hour-detail.component';
import { HappyHourUpdateComponent } from './happy-hour-update.component';
import { HappyHourDeletePopupComponent } from './happy-hour-delete-dialog.component';
import { IHappyHour } from 'app/shared/model/jmenuback/happy-hour.model';

@Injectable({ providedIn: 'root' })
export class HappyHourResolve implements Resolve<IHappyHour> {
    constructor(private service: HappyHourService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IHappyHour> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<HappyHour>) => response.ok),
                map((happyHour: HttpResponse<HappyHour>) => happyHour.body)
            );
        }
        return of(new HappyHour());
    }
}

export const happyHourRoute: Routes = [
    {
        path: '',
        component: HappyHourComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackHappyHour.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: HappyHourDetailComponent,
        resolve: {
            happyHour: HappyHourResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackHappyHour.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: HappyHourUpdateComponent,
        resolve: {
            happyHour: HappyHourResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackHappyHour.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: HappyHourUpdateComponent,
        resolve: {
            happyHour: HappyHourResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackHappyHour.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const happyHourPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: HappyHourDeletePopupComponent,
        resolve: {
            happyHour: HappyHourResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackHappyHour.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
