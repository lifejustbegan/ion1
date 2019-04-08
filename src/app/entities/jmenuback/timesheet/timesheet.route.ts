import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Timesheet } from 'app/shared/model/jmenuback/timesheet.model';
import { TimesheetService } from './timesheet.service';
import { TimesheetComponent } from './timesheet.component';
import { TimesheetDetailComponent } from './timesheet-detail.component';
import { TimesheetUpdateComponent } from './timesheet-update.component';
import { TimesheetDeletePopupComponent } from './timesheet-delete-dialog.component';
import { ITimesheet } from 'app/shared/model/jmenuback/timesheet.model';

@Injectable({ providedIn: 'root' })
export class TimesheetResolve implements Resolve<ITimesheet> {
    constructor(private service: TimesheetService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITimesheet> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Timesheet>) => response.ok),
                map((timesheet: HttpResponse<Timesheet>) => timesheet.body)
            );
        }
        return of(new Timesheet());
    }
}

export const timesheetRoute: Routes = [
    {
        path: '',
        component: TimesheetComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackTimesheet.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: TimesheetDetailComponent,
        resolve: {
            timesheet: TimesheetResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackTimesheet.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: TimesheetUpdateComponent,
        resolve: {
            timesheet: TimesheetResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackTimesheet.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: TimesheetUpdateComponent,
        resolve: {
            timesheet: TimesheetResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackTimesheet.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const timesheetPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: TimesheetDeletePopupComponent,
        resolve: {
            timesheet: TimesheetResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ionApp.jmenubackTimesheet.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
