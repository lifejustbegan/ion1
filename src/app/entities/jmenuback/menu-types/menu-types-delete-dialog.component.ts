import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMenuTypes } from 'app/shared/model/jmenuback/menu-types.model';
import { MenuTypesService } from './menu-types.service';

@Component({
    selector: 'jhi-menu-types-delete-dialog',
    templateUrl: './menu-types-delete-dialog.component.html'
})
export class MenuTypesDeleteDialogComponent {
    menuTypes: IMenuTypes;

    constructor(
        protected menuTypesService: MenuTypesService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.menuTypesService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'menuTypesListModification',
                content: 'Deleted an menuTypes'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-menu-types-delete-popup',
    template: ''
})
export class MenuTypesDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ menuTypes }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MenuTypesDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.menuTypes = menuTypes;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/menu-types', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/menu-types', { outlets: { popup: null } }]);
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
