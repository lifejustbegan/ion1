/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IonTestModule } from '../../../../test.module';
import { IngredientsDetailComponent } from 'app/entities/jmenuback/ingredients/ingredients-detail.component';
import { Ingredients } from 'app/shared/model/jmenuback/ingredients.model';

describe('Component Tests', () => {
    describe('Ingredients Management Detail Component', () => {
        let comp: IngredientsDetailComponent;
        let fixture: ComponentFixture<IngredientsDetailComponent>;
        const route = ({ data: of({ ingredients: new Ingredients(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IonTestModule],
                declarations: [IngredientsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(IngredientsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(IngredientsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.ingredients).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
