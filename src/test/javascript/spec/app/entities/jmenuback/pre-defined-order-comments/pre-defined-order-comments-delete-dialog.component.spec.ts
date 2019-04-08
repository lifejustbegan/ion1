/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IonTestModule } from '../../../../test.module';
import { PreDefinedOrderCommentsDeleteDialogComponent } from 'app/entities/jmenuback/pre-defined-order-comments/pre-defined-order-comments-delete-dialog.component';
import { PreDefinedOrderCommentsService } from 'app/entities/jmenuback/pre-defined-order-comments/pre-defined-order-comments.service';

describe('Component Tests', () => {
    describe('PreDefinedOrderComments Management Delete Component', () => {
        let comp: PreDefinedOrderCommentsDeleteDialogComponent;
        let fixture: ComponentFixture<PreDefinedOrderCommentsDeleteDialogComponent>;
        let service: PreDefinedOrderCommentsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IonTestModule],
                declarations: [PreDefinedOrderCommentsDeleteDialogComponent]
            })
                .overrideTemplate(PreDefinedOrderCommentsDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PreDefinedOrderCommentsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PreDefinedOrderCommentsService);
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
