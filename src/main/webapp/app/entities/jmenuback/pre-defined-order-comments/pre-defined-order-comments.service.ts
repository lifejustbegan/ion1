import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPreDefinedOrderComments } from 'app/shared/model/jmenuback/pre-defined-order-comments.model';

type EntityResponseType = HttpResponse<IPreDefinedOrderComments>;
type EntityArrayResponseType = HttpResponse<IPreDefinedOrderComments[]>;

@Injectable({ providedIn: 'root' })
export class PreDefinedOrderCommentsService {
    public resourceUrl = SERVER_API_URL + 'jmenuback/api/pre-defined-order-comments';
    public resourceSearchUrl = SERVER_API_URL + 'jmenuback/api/_search/pre-defined-order-comments';

    constructor(protected http: HttpClient) {}

    create(preDefinedOrderComments: IPreDefinedOrderComments): Observable<EntityResponseType> {
        return this.http.post<IPreDefinedOrderComments>(this.resourceUrl, preDefinedOrderComments, { observe: 'response' });
    }

    update(preDefinedOrderComments: IPreDefinedOrderComments): Observable<EntityResponseType> {
        return this.http.put<IPreDefinedOrderComments>(this.resourceUrl, preDefinedOrderComments, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPreDefinedOrderComments>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPreDefinedOrderComments[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPreDefinedOrderComments[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
