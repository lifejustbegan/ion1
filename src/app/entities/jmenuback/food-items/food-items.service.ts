import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFoodItems } from 'app/shared/model/jmenuback/food-items.model';

type EntityResponseType = HttpResponse<IFoodItems>;
type EntityArrayResponseType = HttpResponse<IFoodItems[]>;

@Injectable({ providedIn: 'root' })
export class FoodItemsService {
    public resourceUrl = SERVER_API_URL + 'jmenuback/api/food-items';
    public resourceSearchUrl = SERVER_API_URL + 'jmenuback/api/_search/food-items';

    constructor(protected http: HttpClient) {}

    create(foodItems: IFoodItems): Observable<EntityResponseType> {
        return this.http.post<IFoodItems>(this.resourceUrl, foodItems, { observe: 'response' });
    }

    update(foodItems: IFoodItems): Observable<EntityResponseType> {
        return this.http.put<IFoodItems>(this.resourceUrl, foodItems, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IFoodItems>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IFoodItems[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IFoodItems[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
