import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICharge } from 'app/shared/model/jmenuback/charge.model';
import { ChargeService } from './charge.service';

@Component({
    selector: 'jhi-charge-delete-dialog',
    templateUrl: './charge-delete-dialog.component.html'
})
export class ChargeDeleteDialogComponent {
    charge: ICharge;

    constructor(protected chargeService: ChargeService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.chargeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'chargeListModification',
                content: 'Deleted an charge'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-charge-delete-popup',
    template: ''
})
export class ChargeDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ charge }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ChargeDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.charge = charge;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/charge', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/charge', { outlets: { popup: null } }]);
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
