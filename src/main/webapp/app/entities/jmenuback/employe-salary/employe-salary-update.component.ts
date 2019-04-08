import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IEmployeSalary } from 'app/shared/model/jmenuback/employe-salary.model';
import { EmployeSalaryService } from './employe-salary.service';

@Component({
    selector: 'jhi-employe-salary-update',
    templateUrl: './employe-salary-update.component.html'
})
export class EmployeSalaryUpdateComponent implements OnInit {
    employeSalary: IEmployeSalary;
    isSaving: boolean;

    constructor(protected employeSalaryService: EmployeSalaryService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ employeSalary }) => {
            this.employeSalary = employeSalary;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.employeSalary.id !== undefined) {
            this.subscribeToSaveResponse(this.employeSalaryService.update(this.employeSalary));
        } else {
            this.subscribeToSaveResponse(this.employeSalaryService.create(this.employeSalary));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmployeSalary>>) {
        result.subscribe((res: HttpResponse<IEmployeSalary>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
