/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IonTestModule } from '../../../../test.module';
import { EmployeSalaryDeleteDialogComponent } from 'app/entities/jmenuback/employe-salary/employe-salary-delete-dialog.component';
import { EmployeSalaryService } from 'app/entities/jmenuback/employe-salary/employe-salary.service';

describe('Component Tests', () => {
    describe('EmployeSalary Management Delete Component', () => {
        let comp: EmployeSalaryDeleteDialogComponent;
        let fixture: ComponentFixture<EmployeSalaryDeleteDialogComponent>;
        let service: EmployeSalaryService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IonTestModule],
                declarations: [EmployeSalaryDeleteDialogComponent]
            })
                .overrideTemplate(EmployeSalaryDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EmployeSalaryDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmployeSalaryService);
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
