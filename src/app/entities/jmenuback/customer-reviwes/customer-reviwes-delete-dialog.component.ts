import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICustomerReviwes } from 'app/shared/model/jmenuback/customer-reviwes.model';
import { CustomerReviwesService } from './customer-reviwes.service';

@Component({
    selector: 'jhi-customer-reviwes-delete-dialog',
    templateUrl: './customer-reviwes-delete-dialog.component.html'
})
export class CustomerReviwesDeleteDialogComponent {
    customerReviwes: ICustomerReviwes;

    constructor(
        protected customerReviwesService: CustomerReviwesService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.customerReviwesService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'customerReviwesListModification',
                content: 'Deleted an customerReviwes'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-customer-reviwes-delete-popup',
    template: ''
})
export class CustomerReviwesDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ customerReviwes }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CustomerReviwesDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.customerReviwes = customerReviwes;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/customer-reviwes', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/customer-reviwes', { outlets: { popup: null } }]);
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
