import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEmployeSalary } from 'app/shared/model/jmenuback/employe-salary.model';

type EntityResponseType = HttpResponse<IEmployeSalary>;
type EntityArrayResponseType = HttpResponse<IEmployeSalary[]>;

@Injectable({ providedIn: 'root' })
export class EmployeSalaryService {
    public resourceUrl = SERVER_API_URL + 'jmenuback/api/employe-salaries';
    public resourceSearchUrl = SERVER_API_URL + 'jmenuback/api/_search/employe-salaries';

    constructor(protected http: HttpClient) {}

    create(employeSalary: IEmployeSalary): Observable<EntityResponseType> {
        return this.http.post<IEmployeSalary>(this.resourceUrl, employeSalary, { observe: 'response' });
    }

    update(employeSalary: IEmployeSalary): Observable<EntityResponseType> {
        return this.http.put<IEmployeSalary>(this.resourceUrl, employeSalary, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IEmployeSalary>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEmployeSalary[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEmployeSalary[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
