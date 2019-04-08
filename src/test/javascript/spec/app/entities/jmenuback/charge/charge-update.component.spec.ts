/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { IonTestModule } from '../../../../test.module';
import { ChargeUpdateComponent } from 'app/entities/jmenuback/charge/charge-update.component';
import { ChargeService } from 'app/entities/jmenuback/charge/charge.service';
import { Charge } from 'app/shared/model/jmenuback/charge.model';

describe('Component Tests', () => {
    describe('Charge Management Update Component', () => {
        let comp: ChargeUpdateComponent;
        let fixture: ComponentFixture<ChargeUpdateComponent>;
        let service: ChargeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IonTestModule],
                declarations: [ChargeUpdateComponent]
            })
                .overrideTemplate(ChargeUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ChargeUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChargeService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Charge(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.charge = entity;
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
                    const entity = new Charge();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.charge = entity;
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
