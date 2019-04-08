import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMenuCategorie } from 'app/shared/model/jmenuback/menu-categorie.model';

type EntityResponseType = HttpResponse<IMenuCategorie>;
type EntityArrayResponseType = HttpResponse<IMenuCategorie[]>;

@Injectable({ providedIn: 'root' })
export class MenuCategorieService {
    public resourceUrl = SERVER_API_URL + 'jmenuback/api/menu-categories';
    public resourceSearchUrl = SERVER_API_URL + 'jmenuback/api/_search/menu-categories';

    constructor(protected http: HttpClient) {}

    create(menuCategorie: IMenuCategorie): Observable<EntityResponseType> {
        return this.http.post<IMenuCategorie>(this.resourceUrl, menuCategorie, { observe: 'response' });
    }

    update(menuCategorie: IMenuCategorie): Observable<EntityResponseType> {
        return this.http.put<IMenuCategorie>(this.resourceUrl, menuCategorie, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IMenuCategorie>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMenuCategorie[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMenuCategorie[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
