/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IonTestModule } from '../../../../test.module';
import { HappyHourDeleteDialogComponent } from 'app/entities/jmenuback/happy-hour/happy-hour-delete-dialog.component';
import { HappyHourService } from 'app/entities/jmenuback/happy-hour/happy-hour.service';

describe('Component Tests', () => {
    describe('HappyHour Management Delete Component', () => {
        let comp: HappyHourDeleteDialogComponent;
        let fixture: ComponentFixture<HappyHourDeleteDialogComponent>;
        let service: HappyHourService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IonTestModule],
                declarations: [HappyHourDeleteDialogComponent]
            })
                .overrideTemplate(HappyHourDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(HappyHourDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HappyHourService);
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
