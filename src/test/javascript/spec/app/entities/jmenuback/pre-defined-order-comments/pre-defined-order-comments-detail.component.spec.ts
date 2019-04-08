/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IonTestModule } from '../../../../test.module';
import { PreDefinedOrderCommentsDetailComponent } from 'app/entities/jmenuback/pre-defined-order-comments/pre-defined-order-comments-detail.component';
import { PreDefinedOrderComments } from 'app/shared/model/jmenuback/pre-defined-order-comments.model';

describe('Component Tests', () => {
    describe('PreDefinedOrderComments Management Detail Component', () => {
        let comp: PreDefinedOrderCommentsDetailComponent;
        let fixture: ComponentFixture<PreDefinedOrderCommentsDetailComponent>;
        const route = ({ data: of({ preDefinedOrderComments: new PreDefinedOrderComments(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IonTestModule],
                declarations: [PreDefinedOrderCommentsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PreDefinedOrderCommentsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PreDefinedOrderCommentsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.preDefinedOrderComments).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
