/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IonTestModule } from '../../../../test.module';
import { OrderCommentDetailComponent } from 'app/entities/jmenuback/order-comment/order-comment-detail.component';
import { OrderComment } from 'app/shared/model/jmenuback/order-comment.model';

describe('Component Tests', () => {
    describe('OrderComment Management Detail Component', () => {
        let comp: OrderCommentDetailComponent;
        let fixture: ComponentFixture<OrderCommentDetailComponent>;
        const route = ({ data: of({ orderComment: new OrderComment(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IonTestModule],
                declarations: [OrderCommentDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(OrderCommentDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OrderCommentDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.orderComment).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
