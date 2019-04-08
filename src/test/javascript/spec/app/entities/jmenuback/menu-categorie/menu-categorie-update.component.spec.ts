/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { IonTestModule } from '../../../../test.module';
import { MenuCategorieUpdateComponent } from 'app/entities/jmenuback/menu-categorie/menu-categorie-update.component';
import { MenuCategorieService } from 'app/entities/jmenuback/menu-categorie/menu-categorie.service';
import { MenuCategorie } from 'app/shared/model/jmenuback/menu-categorie.model';

describe('Component Tests', () => {
    describe('MenuCategorie Management Update Component', () => {
        let comp: MenuCategorieUpdateComponent;
        let fixture: ComponentFixture<MenuCategorieUpdateComponent>;
        let service: MenuCategorieService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IonTestModule],
                declarations: [MenuCategorieUpdateComponent]
            })
                .overrideTemplate(MenuCategorieUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MenuCategorieUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MenuCategorieService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new MenuCategorie(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.menuCategorie = entity;
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
                    const entity = new MenuCategorie();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.menuCategorie = entity;
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
