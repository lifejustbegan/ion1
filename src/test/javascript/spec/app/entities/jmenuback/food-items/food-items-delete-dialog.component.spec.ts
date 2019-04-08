/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IonTestModule } from '../../../../test.module';
import { FoodItemsDeleteDialogComponent } from 'app/entities/jmenuback/food-items/food-items-delete-dialog.component';
import { FoodItemsService } from 'app/entities/jmenuback/food-items/food-items.service';

describe('Component Tests', () => {
    describe('FoodItems Management Delete Component', () => {
        let comp: FoodItemsDeleteDialogComponent;
        let fixture: ComponentFixture<FoodItemsDeleteDialogComponent>;
        let service: FoodItemsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IonTestModule],
                declarations: [FoodItemsDeleteDialogComponent]
            })
                .overrideTemplate(FoodItemsDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FoodItemsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FoodItemsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
