/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { IonTestModule } from '../../../../test.module';
import { FoodItemsUpdateComponent } from 'app/entities/jmenuback/food-items/food-items-update.component';
import { FoodItemsService } from 'app/entities/jmenuback/food-items/food-items.service';
import { FoodItems } from 'app/shared/model/jmenuback/food-items.model';

describe('Component Tests', () => {
    describe('FoodItems Management Update Component', () => {
        let comp: FoodItemsUpdateComponent;
        let fixture: ComponentFixture<FoodItemsUpdateComponent>;
        let service: FoodItemsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IonTestModule],
                declarations: [FoodItemsUpdateComponent]
            })
                .overrideTemplate(FoodItemsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FoodItemsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FoodItemsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new FoodItems(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.foodItems = entity;
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
                    const entity = new FoodItems();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.foodItems = entity;
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
