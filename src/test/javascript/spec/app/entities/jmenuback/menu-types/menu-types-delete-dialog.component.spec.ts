/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IonTestModule } from '../../../../test.module';
import { MenuTypesDeleteDialogComponent } from 'app/entities/jmenuback/menu-types/menu-types-delete-dialog.component';
import { MenuTypesService } from 'app/entities/jmenuback/menu-types/menu-types.service';

describe('Component Tests', () => {
    describe('MenuTypes Management Delete Component', () => {
        let comp: MenuTypesDeleteDialogComponent;
        let fixture: ComponentFixture<MenuTypesDeleteDialogComponent>;
        let service: MenuTypesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IonTestModule],
                declarations: [MenuTypesDeleteDialogComponent]
            })
                .overrideTemplate(MenuTypesDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MenuTypesDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MenuTypesService);
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
