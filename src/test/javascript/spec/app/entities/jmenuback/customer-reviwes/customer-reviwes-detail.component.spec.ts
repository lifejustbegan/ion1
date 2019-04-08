/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IonTestModule } from '../../../../test.module';
import { CustomerReviwesDetailComponent } from 'app/entities/jmenuback/customer-reviwes/customer-reviwes-detail.component';
import { CustomerReviwes } from 'app/shared/model/jmenuback/customer-reviwes.model';

describe('Component Tests', () => {
    describe('CustomerReviwes Management Detail Component', () => {
        let comp: CustomerReviwesDetailComponent;
        let fixture: ComponentFixture<CustomerReviwesDetailComponent>;
        const route = ({ data: of({ customerReviwes: new CustomerReviwes(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IonTestModule],
                declarations: [CustomerReviwesDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CustomerReviwesDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CustomerReviwesDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.customerReviwes).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
