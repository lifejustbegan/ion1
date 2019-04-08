import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEmployeSalary } from 'app/shared/model/jmenuback/employe-salary.model';
import { EmployeSalaryService } from './employe-salary.service';

@Component({
    selector: 'jhi-employe-salary-delete-dialog',
    templateUrl: './employe-salary-delete-dialog.component.html'
})
export class EmployeSalaryDeleteDialogComponent {
    employeSalary: IEmployeSalary;

    constructor(
        protected employeSalaryService: EmployeSalaryService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.employeSalaryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'employeSalaryListModification',
                content: 'Deleted an employeSalary'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-employe-salary-delete-popup',
    template: ''
})
export class EmployeSalaryDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ employeSalary }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(EmployeSalaryDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.employeSalary = employeSalary;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/employe-salary', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/employe-salary', { outlets: { popup: null } }]);
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
