/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { IonTestModule } from '../../../../test.module';
import { EmployeeCommentUpdateComponent } from 'app/entities/jmenuback/employee-comment/employee-comment-update.component';
import { EmployeeCommentService } from 'app/entities/jmenuback/employee-comment/employee-comment.service';
import { EmployeeComment } from 'app/shared/model/jmenuback/employee-comment.model';

describe('Component Tests', () => {
    describe('EmployeeComment Management Update Component', () => {
        let comp: EmployeeCommentUpdateComponent;
        let fixture: ComponentFixture<EmployeeCommentUpdateComponent>;
        let service: EmployeeCommentService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IonTestModule],
                declarations: [EmployeeCommentUpdateComponent]
            })
                .overrideTemplate(EmployeeCommentUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EmployeeCommentUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmployeeCommentService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new EmployeeComment(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.employeeComment = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new EmployeeComment();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.employeeComment = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
