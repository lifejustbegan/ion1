import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IEmployeeComment } from 'app/shared/model/jmenuback/employee-comment.model';

@Component({
    selector: 'jhi-employee-comment-detail',
    templateUrl: './employee-comment-detail.component.html'
})
export class EmployeeCommentDetailComponent implements OnInit {
    employeeComment: IEmployeeComment;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ employeeComment }) => {
            this.employeeComment = employeeComment;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }
}
