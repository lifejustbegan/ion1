import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMenuCategorie } from 'app/shared/model/jmenuback/menu-categorie.model';
import { MenuCategorieService } from './menu-categorie.service';

@Component({
    selector: 'jhi-menu-categorie-delete-dialog',
    templateUrl: './menu-categorie-delete-dialog.component.html'
})
export class MenuCategorieDeleteDialogComponent {
    menuCategorie: IMenuCategorie;

    constructor(
        protected menuCategorieService: MenuCategorieService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.menuCategorieService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'menuCategorieListModification',
                content: 'Deleted an menuCategorie'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-menu-categorie-delete-popup',
    template: ''
})
export class MenuCategorieDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ menuCategorie }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MenuCategorieDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.menuCategorie = menuCategorie;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/menu-categorie', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/menu-categorie', { outlets: { popup: null } }]);
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
