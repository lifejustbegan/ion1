import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMenuTypes } from 'app/shared/model/jmenuback/menu-types.model';

type EntityResponseType = HttpResponse<IMenuTypes>;
type EntityArrayResponseType = HttpResponse<IMenuTypes[]>;

@Injectable({ providedIn: 'root' })
export class MenuTypesService {
    public resourceUrl = SERVER_API_URL + 'jmenuback/api/menu-types';
    public resourceSearchUrl = SERVER_API_URL + 'jmenuback/api/_search/menu-types';

    constructor(protected http: HttpClient) {}

    create(menuTypes: IMenuTypes): Observable<EntityResponseType> {
        return this.http.post<IMenuTypes>(this.resourceUrl, menuTypes, { observe: 'response' });
    }

    update(menuTypes: IMenuTypes): Observable<EntityResponseType> {
        return this.http.put<IMenuTypes>(this.resourceUrl, menuTypes, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IMenuTypes>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMenuTypes[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMenuTypes[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
