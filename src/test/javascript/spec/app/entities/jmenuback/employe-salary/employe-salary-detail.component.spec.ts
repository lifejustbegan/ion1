/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IonTestModule } from '../../../../test.module';
import { EmployeSalaryDetailComponent } from 'app/entities/jmenuback/employe-salary/employe-salary-detail.component';
import { EmployeSalary } from 'app/shared/model/jmenuback/employe-salary.model';

describe('Component Tests', () => {
    describe('EmployeSalary Management Detail Component', () => {
        let comp: EmployeSalaryDetailComponent;
        let fixture: ComponentFixture<EmployeSalaryDetailComponent>;
        const route = ({ data: of({ employeSalary: new EmployeSalary(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IonTestModule],
                declarations: [EmployeSalaryDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EmployeSalaryDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EmployeSalaryDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.employeSalary).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
