/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IonTestModule } from '../../../../test.module';
import { CustomerReviwesDeleteDialogComponent } from 'app/entities/jmenuback/customer-reviwes/customer-reviwes-delete-dialog.component';
import { CustomerReviwesService } from 'app/entities/jmenuback/customer-reviwes/customer-reviwes.service';

describe('Component Tests', () => {
    describe('CustomerReviwes Management Delete Component', () => {
        let comp: CustomerReviwesDeleteDialogComponent;
        let fixture: ComponentFixture<CustomerReviwesDeleteDialogComponent>;
        let service: CustomerReviwesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IonTestModule],
                declarations: [CustomerReviwesDeleteDialogComponent]
            })
                .overrideTemplate(CustomerReviwesDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CustomerReviwesDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerReviwesService);
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
