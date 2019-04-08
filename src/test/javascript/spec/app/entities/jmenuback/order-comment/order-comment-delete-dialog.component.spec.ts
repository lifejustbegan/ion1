/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IonTestModule } from '../../../../test.module';
import { OrderCommentDeleteDialogComponent } from 'app/entities/jmenuback/order-comment/order-comment-delete-dialog.component';
import { OrderCommentService } from 'app/entities/jmenuback/order-comment/order-comment.service';

describe('Component Tests', () => {
    describe('OrderComment Management Delete Component', () => {
        let comp: OrderCommentDeleteDialogComponent;
        let fixture: ComponentFixture<OrderCommentDeleteDialogComponent>;
        let service: OrderCommentService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IonTestModule],
                declarations: [OrderCommentDeleteDialogComponent]
            })
                .overrideTemplate(OrderCommentDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OrderCommentDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderCommentService);
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
