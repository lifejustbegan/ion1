/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IonTestModule } from '../../../../test.module';
import { PrintDeleteDialogComponent } from 'app/entities/jmenuback/print/print-delete-dialog.component';
import { PrintService } from 'app/entities/jmenuback/print/print.service';

describe('Component Tests', () => {
    describe('Print Management Delete Component', () => {
        let comp: PrintDeleteDialogComponent;
        let fixture: ComponentFixture<PrintDeleteDialogComponent>;
        let service: PrintService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IonTestModule],
                declarations: [PrintDeleteDialogComponent]
            })
                .overrideTemplate(PrintDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PrintDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrintService);
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
