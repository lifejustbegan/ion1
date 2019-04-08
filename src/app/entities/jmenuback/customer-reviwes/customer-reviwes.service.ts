import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICustomerReviwes } from 'app/shared/model/jmenuback/customer-reviwes.model';

type EntityResponseType = HttpResponse<ICustomerReviwes>;
type EntityArrayResponseType = HttpResponse<ICustomerReviwes[]>;

@Injectable({ providedIn: 'root' })
export class CustomerReviwesService {
    public resourceUrl = SERVER_API_URL + 'jmenuback/api/customer-reviwes';
    public resourceSearchUrl = SERVER_API_URL + 'jmenuback/api/_search/customer-reviwes';

    constructor(protected http: HttpClient) {}

    create(customerReviwes: ICustomerReviwes): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(customerReviwes);
        return this.http
            .post<ICustomerReviwes>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(customerReviwes: ICustomerReviwes): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(customerReviwes);
        return this.http
            .put<ICustomerReviwes>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ICustomerReviwes>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ICustomerReviwes[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ICustomerReviwes[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(customerReviwes: ICustomerReviwes): ICustomerReviwes {
        const copy: ICustomerReviwes = Object.assign({}, customerReviwes, {
            createdDate:
                customerReviwes.createdDate != null && customerReviwes.createdDate.isValid() ? customerReviwes.createdDate.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.createdDate = res.body.createdDate != null ? moment(res.body.createdDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((customerReviwes: ICustomerReviwes) => {
                customerReviwes.createdDate = customerReviwes.createdDate != null ? moment(customerReviwes.createdDate) : null;
            });
        }
        return res;
    }
}
