/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IonTestModule } from '../../../../test.module';
import { EmployeeCommentDetailComponent } from 'app/entities/jmenuback/employee-comment/employee-comment-detail.component';
import { EmployeeComment } from 'app/shared/model/jmenuback/employee-comment.model';

describe('Component Tests', () => {
    describe('EmployeeComment Management Detail Component', () => {
        let comp: EmployeeCommentDetailComponent;
        let fixture: ComponentFixture<EmployeeCommentDetailComponent>;
        const route = ({ data: of({ employeeComment: new EmployeeComment(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IonTestModule],
                declarations: [EmployeeCommentDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EmployeeCommentDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EmployeeCommentDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.employeeComment).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
