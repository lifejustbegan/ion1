import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEmployeeComment } from 'app/shared/model/jmenuback/employee-comment.model';
import { EmployeeCommentService } from './employee-comment.service';

@Component({
    selector: 'jhi-employee-comment-delete-dialog',
    templateUrl: './employee-comment-delete-dialog.component.html'
})
export class EmployeeCommentDeleteDialogComponent {
    employeeComment: IEmployeeComment;

    constructor(
        protected employeeCommentService: EmployeeCommentService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.employeeCommentService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'employeeCommentListModification',
                content: 'Deleted an employeeComment'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-employee-comment-delete-popup',
    template: ''
})
export class EmployeeCommentDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ employeeComment }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(EmployeeCommentDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.employeeComment = employeeComment;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/employee-comment', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/employee-comment', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
