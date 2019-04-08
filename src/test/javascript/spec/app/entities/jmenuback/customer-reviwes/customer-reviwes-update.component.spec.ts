/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { IonTestModule } from '../../../../test.module';
import { CustomerReviwesUpdateComponent } from 'app/entities/jmenuback/customer-reviwes/customer-reviwes-update.component';
import { CustomerReviwesService } from 'app/entities/jmenuback/customer-reviwes/customer-reviwes.service';
import { CustomerReviwes } from 'app/shared/model/jmenuback/customer-reviwes.model';

describe('Component Tests', () => {
    describe('CustomerReviwes Management Update Component', () => {
        let comp: CustomerReviwesUpdateComponent;
        let fixture: ComponentFixture<CustomerReviwesUpdateComponent>;
        let service: CustomerReviwesService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IonTestModule],
                declarations: [CustomerReviwesUpdateComponent]
            })
                .overrideTemplate(CustomerReviwesUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CustomerReviwesUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerReviwesService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CustomerReviwes(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.customerReviwes = entity;
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
                    const entity = new CustomerReviwes();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.customerReviwes = entity;
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
