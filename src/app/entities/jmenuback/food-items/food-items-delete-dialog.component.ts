import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFoodItems } from 'app/shared/model/jmenuback/food-items.model';
import { FoodItemsService } from './food-items.service';

@Component({
    selector: 'jhi-food-items-delete-dialog',
    templateUrl: './food-items-delete-dialog.component.html'
})
export class FoodItemsDeleteDialogComponent {
    foodItems: IFoodItems;

    constructor(
        protected foodItemsService: FoodItemsService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.foodItemsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'foodItemsListModification',
                content: 'Deleted an foodItems'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-food-items-delete-popup',
    template: ''
})
export class FoodItemsDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ foodItems }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(FoodItemsDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.foodItems = foodItems;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/food-items', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/food-items', { outlets: { popup: null } }]);
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
