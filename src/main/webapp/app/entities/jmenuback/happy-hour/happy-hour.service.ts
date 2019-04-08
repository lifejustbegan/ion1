import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IHappyHour } from 'app/shared/model/jmenuback/happy-hour.model';

type EntityResponseType = HttpResponse<IHappyHour>;
type EntityArrayResponseType = HttpResponse<IHappyHour[]>;

@Injectable({ providedIn: 'root' })
export class HappyHourService {
    public resourceUrl = SERVER_API_URL + 'jmenuback/api/happy-hours';
    public resourceSearchUrl = SERVER_API_URL + 'jmenuback/api/_search/happy-hours';

    constructor(protected http: HttpClient) {}

    create(happyHour: IHappyHour): Observable<EntityResponseType> {
        return this.http.post<IHappyHour>(this.resourceUrl, happyHour, { observe: 'response' });
    }

    update(happyHour: IHappyHour): Observable<EntityResponseType> {
        return this.http.put<IHappyHour>(this.resourceUrl, happyHour, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IHappyHour>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IHappyHour[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IHappyHour[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
