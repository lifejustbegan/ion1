/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { IonTestModule } from '../../../../test.module';
import { PreDefinedOrderCommentsUpdateComponent } from 'app/entities/jmenuback/pre-defined-order-comments/pre-defined-order-comments-update.component';
import { PreDefinedOrderCommentsService } from 'app/entities/jmenuback/pre-defined-order-comments/pre-defined-order-comments.service';
import { PreDefinedOrderComments } from 'app/shared/model/jmenuback/pre-defined-order-comments.model';

describe('Component Tests', () => {
    describe('PreDefinedOrderComments Management Update Component', () => {
        let comp: PreDefinedOrderCommentsUpdateComponent;
        let fixture: ComponentFixture<PreDefinedOrderCommentsUpdateComponent>;
        let service: PreDefinedOrderCommentsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IonTestModule],
                declarations: [PreDefinedOrderCommentsUpdateComponent]
            })
                .overrideTemplate(PreDefinedOrderCommentsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PreDefinedOrderCommentsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PreDefinedOrderCommentsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PreDefinedOrderComments(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.preDefinedOrderComments = entity;
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
                    const entity = new PreDefinedOrderComments();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.preDefinedOrderComments = entity;
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
