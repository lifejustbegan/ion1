/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IonTestModule } from '../../../../test.module';
import { ChargeDeleteDialogComponent } from 'app/entities/jmenuback/charge/charge-delete-dialog.component';
import { ChargeService } from 'app/entities/jmenuback/charge/charge.service';

describe('Component Tests', () => {
    describe('Charge Management Delete Component', () => {
        let comp: ChargeDeleteDialogComponent;
        let fixture: ComponentFixture<ChargeDeleteDialogComponent>;
        let service: ChargeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IonTestModule],
                declarations: [ChargeDeleteDialogComponent]
            })
                .overrideTemplate(ChargeDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ChargeDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChargeService);
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
