/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IonTestModule } from '../../../../test.module';
import { EmployeeCommentDeleteDialogComponent } from 'app/entities/jmenuback/employee-comment/employee-comment-delete-dialog.component';
import { EmployeeCommentService } from 'app/entities/jmenuback/employee-comment/employee-comment.service';

describe('Component Tests', () => {
    describe('EmployeeComment Management Delete Component', () => {
        let comp: EmployeeCommentDeleteDialogComponent;
        let fixture: ComponentFixture<EmployeeCommentDeleteDialogComponent>;
        let service: EmployeeCommentService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IonTestModule],
                declarations: [EmployeeCommentDeleteDialogComponent]
            })
                .overrideTemplate(EmployeeCommentDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EmployeeCommentDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmployeeCommentService);
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
