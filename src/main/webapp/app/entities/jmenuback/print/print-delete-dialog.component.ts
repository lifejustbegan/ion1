import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPrint } from 'app/shared/model/jmenuback/print.model';
import { PrintService } from './print.service';

@Component({
    selector: 'jhi-print-delete-dialog',
    templateUrl: './print-delete-dialog.component.html'
})
export class PrintDeleteDialogComponent {
    print: IPrint;

    constructor(protected printService: PrintService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.printService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'printListModification',
                content: 'Deleted an print'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-print-delete-popup',
    template: ''
})
export class PrintDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ print }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PrintDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.print = print;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/print', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/print', { outlets: { popup: null } }]);
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
