/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { IonTestModule } from '../../../../test.module';
import { MenuTypesUpdateComponent } from 'app/entities/jmenuback/menu-types/menu-types-update.component';
import { MenuTypesService } from 'app/entities/jmenuback/menu-types/menu-types.service';
import { MenuTypes } from 'app/shared/model/jmenuback/menu-types.model';

describe('Component Tests', () => {
    describe('MenuTypes Management Update Component', () => {
        let comp: MenuTypesUpdateComponent;
        let fixture: ComponentFixture<MenuTypesUpdateComponent>;
        let service: MenuTypesService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IonTestModule],
                declarations: [MenuTypesUpdateComponent]
            })
                .overrideTemplate(MenuTypesUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MenuTypesUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MenuTypesService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new MenuTypes(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.menuTypes = entity;
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
                    const entity = new MenuTypes();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.menuTypes = entity;
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
