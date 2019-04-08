import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IMenuCategorie } from 'app/shared/model/jmenuback/menu-categorie.model';

@Component({
    selector: 'jhi-menu-categorie-detail',
    templateUrl: './menu-categorie-detail.component.html'
})
export class MenuCategorieDetailComponent implements OnInit {
    menuCategorie: IMenuCategorie;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ menuCategorie }) => {
            this.menuCategorie = menuCategorie;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }
}
