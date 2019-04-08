import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOrders } from 'app/shared/model/jmenuback/orders.model';

type EntityResponseType = HttpResponse<IOrders>;
type EntityArrayResponseType = HttpResponse<IOrders[]>;

@Injectable({ providedIn: 'root' })
export class OrdersService {
    public resourceUrl = SERVER_API_URL + 'jmenuback/api/orders';
    public resourceSearchUrl = SERVER_API_URL + 'jmenuback/api/_search/orders';

    constructor(protected http: HttpClient) {}

    create(orders: IOrders): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(orders);
        return this.http
            .post<IOrders>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(orders: IOrders): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(orders);
        return this.http
            .put<IOrders>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IOrders>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IOrders[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IOrders[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(orders: IOrders): IOrders {
        const copy: IOrders = Object.assign({}, orders, {
            placedTime: orders.placedTime != null && orders.placedTime.isValid() ? orders.placedTime.toJSON() : null,
            closedTime: orders.closedTime != null && orders.closedTime.isValid() ? orders.closedTime.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.placedTime = res.body.placedTime != null ? moment(res.body.placedTime) : null;
            res.body.closedTime = res.body.closedTime != null ? moment(res.body.closedTime) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((orders: IOrders) => {
                orders.placedTime = orders.placedTime != null ? moment(orders.placedTime) : null;
                orders.closedTime = orders.closedTime != null ? moment(orders.closedTime) : null;
            });
        }
        return res;
    }
}
