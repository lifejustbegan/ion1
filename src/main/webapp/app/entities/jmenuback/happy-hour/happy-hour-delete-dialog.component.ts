import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHappyHour } from 'app/shared/model/jmenuback/happy-hour.model';
import { HappyHourService } from './happy-hour.service';

@Component({
    selector: 'jhi-happy-hour-delete-dialog',
    templateUrl: './happy-hour-delete-dialog.component.html'
})
export class HappyHourDeleteDialogComponent {
    happyHour: IHappyHour;

    constructor(
        protected happyHourService: HappyHourService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.happyHourService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'happyHourListModification',
                content: 'Deleted an happyHour'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-happy-hour-delete-popup',
    template: ''
})
export class HappyHourDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ happyHour }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(HappyHourDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.happyHour = happyHour;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/happy-hour', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/happy-hour', { outlets: { popup: null } }]);
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
