/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IonTestModule } from '../../../../test.module';
import { ChargeDetailComponent } from 'app/entities/jmenuback/charge/charge-detail.component';
import { Charge } from 'app/shared/model/jmenuback/charge.model';

describe('Component Tests', () => {
    describe('Charge Management Detail Component', () => {
        let comp: ChargeDetailComponent;
        let fixture: ComponentFixture<ChargeDetailComponent>;
        const route = ({ data: of({ charge: new Charge(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IonTestModule],
                declarations: [ChargeDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ChargeDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ChargeDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.charge).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
