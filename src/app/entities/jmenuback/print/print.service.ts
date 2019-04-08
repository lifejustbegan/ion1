import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPrint } from 'app/shared/model/jmenuback/print.model';

type EntityResponseType = HttpResponse<IPrint>;
type EntityArrayResponseType = HttpResponse<IPrint[]>;

@Injectable({ providedIn: 'root' })
export class PrintService {
    public resourceUrl = SERVER_API_URL + 'jmenuback/api/prints';
    public resourceSearchUrl = SERVER_API_URL + 'jmenuback/api/_search/prints';

    constructor(protected http: HttpClient) {}

    create(print: IPrint): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(print);
        return this.http
            .post<IPrint>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(print: IPrint): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(print);
        return this.http
            .put<IPrint>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IPrint>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IPrint[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IPrint[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(print: IPrint): IPrint {
        const copy: IPrint = Object.assign({}, print, {
            printedTime: print.printedTime != null && print.printedTime.isValid() ? print.printedTime.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.printedTime = res.body.printedTime != null ? moment(res.body.printedTime) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((print: IPrint) => {
                print.printedTime = print.printedTime != null ? moment(print.printedTime) : null;
            });
        }
        return res;
    }
}
