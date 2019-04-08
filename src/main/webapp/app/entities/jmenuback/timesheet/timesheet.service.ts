import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITimesheet } from 'app/shared/model/jmenuback/timesheet.model';

type EntityResponseType = HttpResponse<ITimesheet>;
type EntityArrayResponseType = HttpResponse<ITimesheet[]>;

@Injectable({ providedIn: 'root' })
export class TimesheetService {
    public resourceUrl = SERVER_API_URL + 'jmenuback/api/timesheets';
    public resourceSearchUrl = SERVER_API_URL + 'jmenuback/api/_search/timesheets';

    constructor(protected http: HttpClient) {}

    create(timesheet: ITimesheet): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(timesheet);
        return this.http
            .post<ITimesheet>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(timesheet: ITimesheet): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(timesheet);
        return this.http
            .put<ITimesheet>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ITimesheet>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ITimesheet[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ITimesheet[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(timesheet: ITimesheet): ITimesheet {
        const copy: ITimesheet = Object.assign({}, timesheet, {
            dateTime: timesheet.dateTime != null && timesheet.dateTime.isValid() ? timesheet.dateTime.toJSON() : null,
            punchInTime: timesheet.punchInTime != null && timesheet.punchInTime.isValid() ? timesheet.punchInTime.toJSON() : null,
            punchOutTime: timesheet.punchOutTime != null && timesheet.punchOutTime.isValid() ? timesheet.punchOutTime.toJSON() : null,
            breakTimeOut: timesheet.breakTimeOut != null && timesheet.breakTimeOut.isValid() ? timesheet.breakTimeOut.toJSON() : null,
            breakTimeIn: timesheet.breakTimeIn != null && timesheet.breakTimeIn.isValid() ? timesheet.breakTimeIn.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.dateTime = res.body.dateTime != null ? moment(res.body.dateTime) : null;
            res.body.punchInTime = res.body.punchInTime != null ? moment(res.body.punchInTime) : null;
            res.body.punchOutTime = res.body.punchOutTime != null ? moment(res.body.punchOutTime) : null;
            res.body.breakTimeOut = res.body.breakTimeOut != null ? moment(res.body.breakTimeOut) : null;
            res.body.breakTimeIn = res.body.breakTimeIn != null ? moment(res.body.breakTimeIn) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((timesheet: ITimesheet) => {
                timesheet.dateTime = timesheet.dateTime != null ? moment(timesheet.dateTime) : null;
                timesheet.punchInTime = timesheet.punchInTime != null ? moment(timesheet.punchInTime) : null;
                timesheet.punchOutTime = timesheet.punchOutTime != null ? moment(timesheet.punchOutTime) : null;
                timesheet.breakTimeOut = timesheet.breakTimeOut != null ? moment(timesheet.breakTimeOut) : null;
                timesheet.breakTimeIn = timesheet.breakTimeIn != null ? moment(timesheet.breakTimeIn) : null;
            });
        }
        return res;
    }
}
