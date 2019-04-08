import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IEmployeeComment } from 'app/shared/model/jmenuback/employee-comment.model';
import { EmployeeCommentService } from './employee-comment.service';
import { IEmployee } from 'app/shared/model/jmenuback/employee.model';
import { EmployeeService } from 'app/entities/jmenuback/employee';

@Component({
    selector: 'jhi-employee-comment-update',
    templateUrl: './employee-comment-update.component.html'
})
export class EmployeeCommentUpdateComponent implements OnInit {
    employeeComment: IEmployeeComment;
    isSaving: boolean;

    employees: IEmployee[];

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected employeeCommentService: EmployeeCommentService,
        protected employeeService: EmployeeService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ employeeComment }) => {
            this.employeeComment = employeeComment;
        });
        this.employeeService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IEmployee[]>) => mayBeOk.ok),
                map((response: HttpResponse<IEmployee[]>) => response.body)
            )
            .subscribe((res: IEmployee[]) => (this.employees = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.employeeComment.id !== undefined) {
            this.subscribeToSaveResponse(this.employeeCommentService.update(this.employeeComment));
        } else {
            this.subscribeToSaveResponse(this.employeeCommentService.create(this.employeeComment));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmployeeComment>>) {
        result.subscribe((res: HttpResponse<IEmployeeComment>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackEmployeeById(index: number, item: IEmployee) {
        return item.id;
    }
}
