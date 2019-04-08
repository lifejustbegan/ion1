import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICustomers } from 'app/shared/model/jmenuback/customers.model';

type EntityResponseType = HttpResponse<ICustomers>;
type EntityArrayResponseType = HttpResponse<ICustomers[]>;

@Injectable({ providedIn: 'root' })
export class CustomersService {
    public resourceUrl = SERVER_API_URL + 'jmenuback/api/customers';
    public resourceSearchUrl = SERVER_API_URL + 'jmenuback/api/_search/customers';

    constructor(protected http: HttpClient) {}

    create(customers: ICustomers): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(customers);
        return this.http
            .post<ICustomers>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(customers: ICustomers): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(customers);
        return this.http
            .put<ICustomers>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ICustomers>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ICustomers[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ICustomers[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(customers: ICustomers): ICustomers {
        const copy: ICustomers = Object.assign({}, customers, {
            signupDate: customers.signupDate != null && customers.signupDate.isValid() ? customers.signupDate.toJSON() : null,
            membershipType:
                customers.membershipType != null && customers.membershipType.isValid() ? customers.membershipType.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.signupDate = res.body.signupDate != null ? moment(res.body.signupDate) : null;
            res.body.membershipType = res.body.membershipType != null ? moment(res.body.membershipType) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((customers: ICustomers) => {
                customers.signupDate = customers.signupDate != null ? moment(customers.signupDate) : null;
                customers.membershipType = customers.membershipType != null ? moment(customers.membershipType) : null;
            });
        }
        return res;
    }
}
