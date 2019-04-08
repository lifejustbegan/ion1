/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IonTestModule } from '../../../../test.module';
import { FoodItemsDetailComponent } from 'app/entities/jmenuback/food-items/food-items-detail.component';
import { FoodItems } from 'app/shared/model/jmenuback/food-items.model';

describe('Component Tests', () => {
    describe('FoodItems Management Detail Component', () => {
        let comp: FoodItemsDetailComponent;
        let fixture: ComponentFixture<FoodItemsDetailComponent>;
        const route = ({ data: of({ foodItems: new FoodItems(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IonTestModule],
                declarations: [FoodItemsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(FoodItemsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FoodItemsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.foodItems).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
