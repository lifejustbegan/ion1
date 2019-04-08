/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IonTestModule } from '../../../../test.module';
import { HappyHourDetailComponent } from 'app/entities/jmenuback/happy-hour/happy-hour-detail.component';
import { HappyHour } from 'app/shared/model/jmenuback/happy-hour.model';

describe('Component Tests', () => {
    describe('HappyHour Management Detail Component', () => {
        let comp: HappyHourDetailComponent;
        let fixture: ComponentFixture<HappyHourDetailComponent>;
        const route = ({ data: of({ happyHour: new HappyHour(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IonTestModule],
                declarations: [HappyHourDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(HappyHourDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(HappyHourDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.happyHour).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
