/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IonTestModule } from '../../../../test.module';
import { TimesheetDetailComponent } from 'app/entities/jmenuback/timesheet/timesheet-detail.component';
import { Timesheet } from 'app/shared/model/jmenuback/timesheet.model';

describe('Component Tests', () => {
    describe('Timesheet Management Detail Component', () => {
        let comp: TimesheetDetailComponent;
        let fixture: ComponentFixture<TimesheetDetailComponent>;
        const route = ({ data: of({ timesheet: new Timesheet(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IonTestModule],
                declarations: [TimesheetDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TimesheetDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TimesheetDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.timesheet).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
