import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOrderComment } from 'app/shared/model/jmenuback/order-comment.model';
import { OrderCommentService } from './order-comment.service';

@Component({
    selector: 'jhi-order-comment-delete-dialog',
    templateUrl: './order-comment-delete-dialog.component.html'
})
export class OrderCommentDeleteDialogComponent {
    orderComment: IOrderComment;

    constructor(
        protected orderCommentService: OrderCommentService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.orderCommentService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'orderCommentListModification',
                content: 'Deleted an orderComment'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-order-comment-delete-popup',
    template: ''
})
export class OrderCommentDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ orderComment }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(OrderCommentDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.orderComment = orderComment;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/order-comment', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/order-comment', { outlets: { popup: null } }]);
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
