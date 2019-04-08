import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITables } from 'app/shared/model/jmenuback/tables.model';

type EntityResponseType = HttpResponse<ITables>;
type EntityArrayResponseType = HttpResponse<ITables[]>;

@Injectable({ providedIn: 'root' })
export class TablesService {
    public resourceUrl = SERVER_API_URL + 'jmenuback/api/tables';
    public resourceSearchUrl = SERVER_API_URL + 'jmenuback/api/_search/tables';

    constructor(protected http: HttpClient) {}

    create(tables: ITables): Observable<EntityResponseType> {
        return this.http.post<ITables>(this.resourceUrl, tables, { observe: 'response' });
    }

    update(tables: ITables): Observable<EntityResponseType> {
        return this.http.put<ITables>(this.resourceUrl, tables, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITables>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITables[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITables[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
