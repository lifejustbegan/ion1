import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEmployeSalary } from 'app/shared/model/jmenuback/employe-salary.model';

@Component({
    selector: 'jhi-employe-salary-detail',
    templateUrl: './employe-salary-detail.component.html'
})
export class EmployeSalaryDetailComponent implements OnInit {
    employeSalary: IEmployeSalary;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ employeSalary }) => {
            this.employeSalary = employeSalary;
        });
    }

    previousState() {
        window.history.back();
    }
}
