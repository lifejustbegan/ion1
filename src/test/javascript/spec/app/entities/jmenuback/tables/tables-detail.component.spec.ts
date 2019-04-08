/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IonTestModule } from '../../../../test.module';
import { TablesDetailComponent } from 'app/entities/jmenuback/tables/tables-detail.component';
import { Tables } from 'app/shared/model/jmenuback/tables.model';

describe('Component Tests', () => {
    describe('Tables Management Detail Component', () => {
        let comp: TablesDetailComponent;
        let fixture: ComponentFixture<TablesDetailComponent>;
        const route = ({ data: of({ tables: new Tables(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IonTestModule],
                declarations: [TablesDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TablesDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TablesDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.tables).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
