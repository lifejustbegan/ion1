/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IonTestModule } from '../../../../test.module';
import { TimesheetDeleteDialogComponent } from 'app/entities/jmenuback/timesheet/timesheet-delete-dialog.component';
import { TimesheetService } from 'app/entities/jmenuback/timesheet/timesheet.service';

describe('Component Tests', () => {
    describe('Timesheet Management Delete Component', () => {
        let comp: TimesheetDeleteDialogComponent;
        let fixture: ComponentFixture<TimesheetDeleteDialogComponent>;
        let service: TimesheetService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IonTestModule],
                declarations: [TimesheetDeleteDialogComponent]
            })
                .overrideTemplate(TimesheetDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TimesheetDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TimesheetService);
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
