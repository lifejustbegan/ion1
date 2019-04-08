import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICharge } from 'app/shared/model/jmenuback/charge.model';

type EntityResponseType = HttpResponse<ICharge>;
type EntityArrayResponseType = HttpResponse<ICharge[]>;

@Injectable({ providedIn: 'root' })
export class ChargeService {
    public resourceUrl = SERVER_API_URL + 'jmenuback/api/charges';
    public resourceSearchUrl = SERVER_API_URL + 'jmenuback/api/_search/charges';

    constructor(protected http: HttpClient) {}

    create(charge: ICharge): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(charge);
        return this.http
            .post<ICharge>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(charge: ICharge): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(charge);
        return this.http
            .put<ICharge>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ICharge>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ICharge[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ICharge[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(charge: ICharge): ICharge {
        const copy: ICharge = Object.assign({}, charge, {
            chargedTime: charge.chargedTime != null && charge.chargedTime.isValid() ? charge.chargedTime.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.chargedTime = res.body.chargedTime != null ? moment(res.body.chargedTime) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((charge: ICharge) => {
                charge.chargedTime = charge.chargedTime != null ? moment(charge.chargedTime) : null;
            });
        }
        return res;
    }
}
