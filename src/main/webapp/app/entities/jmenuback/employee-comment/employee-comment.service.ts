import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEmployeeComment } from 'app/shared/model/jmenuback/employee-comment.model';

type EntityResponseType = HttpResponse<IEmployeeComment>;
type EntityArrayResponseType = HttpResponse<IEmployeeComment[]>;

@Injectable({ providedIn: 'root' })
export class EmployeeCommentService {
    public resourceUrl = SERVER_API_URL + 'jmenuback/api/employee-comments';
    public resourceSearchUrl = SERVER_API_URL + 'jmenuback/api/_search/employee-comments';

    constructor(protected http: HttpClient) {}

    create(employeeComment: IEmployeeComment): Observable<EntityResponseType> {
        return this.http.post<IEmployeeComment>(this.resourceUrl, employeeComment, { observe: 'response' });
    }

    update(employeeComment: IEmployeeComment): Observable<EntityResponseType> {
        return this.http.put<IEmployeeComment>(this.resourceUrl, employeeComment, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IEmployeeComment>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEmployeeComment[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEmployeeComment[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
