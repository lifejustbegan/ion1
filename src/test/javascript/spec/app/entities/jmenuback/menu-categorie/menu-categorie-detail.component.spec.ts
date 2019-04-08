/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IonTestModule } from '../../../../test.module';
import { MenuCategorieDetailComponent } from 'app/entities/jmenuback/menu-categorie/menu-categorie-detail.component';
import { MenuCategorie } from 'app/shared/model/jmenuback/menu-categorie.model';

describe('Component Tests', () => {
    describe('MenuCategorie Management Detail Component', () => {
        let comp: MenuCategorieDetailComponent;
        let fixture: ComponentFixture<MenuCategorieDetailComponent>;
        const route = ({ data: of({ menuCategorie: new MenuCategorie(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IonTestModule],
                declarations: [MenuCategorieDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MenuCategorieDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MenuCategorieDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.menuCategorie).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
