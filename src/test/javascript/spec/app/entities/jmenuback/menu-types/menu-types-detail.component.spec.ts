/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IonTestModule } from '../../../../test.module';
import { MenuTypesDetailComponent } from 'app/entities/jmenuback/menu-types/menu-types-detail.component';
import { MenuTypes } from 'app/shared/model/jmenuback/menu-types.model';

describe('Component Tests', () => {
    describe('MenuTypes Management Detail Component', () => {
        let comp: MenuTypesDetailComponent;
        let fixture: ComponentFixture<MenuTypesDetailComponent>;
        const route = ({ data: of({ menuTypes: new MenuTypes(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IonTestModule],
                declarations: [MenuTypesDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MenuTypesDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MenuTypesDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.menuTypes).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
