/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { IonTestModule } from '../../../../test.module';
import { EmployeSalaryUpdateComponent } from 'app/entities/jmenuback/employe-salary/employe-salary-update.component';
import { EmployeSalaryService } from 'app/entities/jmenuback/employe-salary/employe-salary.service';
import { EmployeSalary } from 'app/shared/model/jmenuback/employe-salary.model';

describe('Component Tests', () => {
    describe('EmployeSalary Management Update Component', () => {
        let comp: EmployeSalaryUpdateComponent;
        let fixture: ComponentFixture<EmployeSalaryUpdateComponent>;
        let service: EmployeSalaryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IonTestModule],
                declarations: [EmployeSalaryUpdateComponent]
            })
                .overrideTemplate(EmployeSalaryUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EmployeSalaryUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmployeSalaryService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new EmployeSalary(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.employeSalary = entity;
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
                    const entity = new EmployeSalary();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.employeSalary = entity;
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
