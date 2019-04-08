import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPreDefinedOrderComments } from 'app/shared/model/jmenuback/pre-defined-order-comments.model';
import { PreDefinedOrderCommentsService } from './pre-defined-order-comments.service';

@Component({
    selector: 'jhi-pre-defined-order-comments-delete-dialog',
    templateUrl: './pre-defined-order-comments-delete-dialog.component.html'
})
export class PreDefinedOrderCommentsDeleteDialogComponent {
    preDefinedOrderComments: IPreDefinedOrderComments;

    constructor(
        protected preDefinedOrderCommentsService: PreDefinedOrderCommentsService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.preDefinedOrderCommentsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'preDefinedOrderCommentsListModification',
                content: 'Deleted an preDefinedOrderComments'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-pre-defined-order-comments-delete-popup',
    template: ''
})
export class PreDefinedOrderCommentsDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ preDefinedOrderComments }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PreDefinedOrderCommentsDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.preDefinedOrderComments = preDefinedOrderComments;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/pre-defined-order-comments', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/pre-defined-order-comments', { outlets: { popup: null } }]);
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
