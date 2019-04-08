/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IonTestModule } from '../../../../test.module';
import { MenuCategorieDeleteDialogComponent } from 'app/entities/jmenuback/menu-categorie/menu-categorie-delete-dialog.component';
import { MenuCategorieService } from 'app/entities/jmenuback/menu-categorie/menu-categorie.service';

describe('Component Tests', () => {
    describe('MenuCategorie Management Delete Component', () => {
        let comp: MenuCategorieDeleteDialogComponent;
        let fixture: ComponentFixture<MenuCategorieDeleteDialogComponent>;
        let service: MenuCategorieService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IonTestModule],
                declarations: [MenuCategorieDeleteDialogComponent]
            })
                .overrideTemplate(MenuCategorieDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MenuCategorieDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MenuCategorieService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
