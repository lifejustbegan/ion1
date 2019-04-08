import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITimesheet } from 'app/shared/model/jmenuback/timesheet.model';
import { TimesheetService } from './timesheet.service';

@Component({
    selector: 'jhi-timesheet-delete-dialog',
    templateUrl: './timesheet-delete-dialog.component.html'
})
export class TimesheetDeleteDialogComponent {
    timesheet: ITimesheet;

    constructor(
        protected timesheetService: TimesheetService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.timesheetService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'timesheetListModification',
                content: 'Deleted an timesheet'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-timesheet-delete-popup',
    template: ''
})
export class TimesheetDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ timesheet }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TimesheetDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.timesheet = timesheet;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/timesheet', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/timesheet', { outlets: { popup: null } }]);
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
