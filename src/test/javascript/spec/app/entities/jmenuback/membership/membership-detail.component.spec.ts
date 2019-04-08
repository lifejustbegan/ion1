/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IonTestModule } from '../../../../test.module';
import { MembershipDetailComponent } from 'app/entities/jmenuback/membership/membership-detail.component';
import { Membership } from 'app/shared/model/jmenuback/membership.model';

describe('Component Tests', () => {
    describe('Membership Management Detail Component', () => {
        let comp: MembershipDetailComponent;
        let fixture: ComponentFixture<MembershipDetailComponent>;
        const route = ({ data: of({ membership: new Membership(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IonTestModule],
                declarations: [MembershipDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MembershipDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MembershipDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.membership).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
