import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ICustomers } from 'app/shared/model/jmenuback/customers.model';
import { CustomersService } from './customers.service';

@Component({
    selector: 'jhi-customers-update',
    templateUrl: './customers-update.component.html'
})
export class CustomersUpdateComponent implements OnInit {
    customers: ICustomers;
    isSaving: boolean;
    signupDate: string;
    membershipType: string;

    constructor(protected customersService: CustomersService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ customers }) => {
            this.customers = customers;
            this.signupDate = this.customers.signupDate != null ? this.customers.signupDate.format(DATE_TIME_FORMAT) : null;
            this.membershipType = this.customers.membershipType != null ? this.customers.membershipType.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.customers.signupDate = this.signupDate != null ? moment(this.signupDate, DATE_TIME_FORMAT) : null;
        this.customers.membershipType = this.membershipType != null ? moment(this.membershipType, DATE_TIME_FORMAT) : null;
        if (this.customers.id !== undefined) {
            this.subscribeToSaveResponse(this.customersService.update(this.customers));
        } else {
            this.subscribeToSaveResponse(this.customersService.create(this.customers));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICustomers>>) {
        result.subscribe((res: HttpResponse<ICustomers>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
