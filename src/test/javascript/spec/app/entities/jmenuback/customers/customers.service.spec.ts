/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { CustomersService } from 'app/entities/jmenuback/customers/customers.service';
import { ICustomers, Customers, JobType } from 'app/shared/model/jmenuback/customers.model';

describe('Service Tests', () => {
    describe('Customers Service', () => {
        let injector: TestBed;
        let service: CustomersService;
        let httpMock: HttpTestingController;
        let elemDefault: ICustomers;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(CustomersService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new Customers(
                0,
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                currentDate,
                currentDate,
                0,
                JobType.OWNER,
                0
            );
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        signupDate: currentDate.format(DATE_TIME_FORMAT),
                        membershipType: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a Customers', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        signupDate: currentDate.format(DATE_TIME_FORMAT),
                        membershipType: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        signupDate: currentDate,
                        membershipType: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new Customers(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a Customers', async () => {
                const returnedFromService = Object.assign(
                    {
                        firstName: 'BBBBBB',
                        lastName: 'BBBBBB',
                        middleName: 'BBBBBB',
                        dob: 'BBBBBB',
                        email: 'BBBBBB',
                        cellNumber: 'BBBBBB',
                        businessPhone: 'BBBBBB',
                        signupDate: currentDate.format(DATE_TIME_FORMAT),
                        membershipType: currentDate.format(DATE_TIME_FORMAT),
                        tip: 1,
                        jobTitle: 'BBBBBB',
                        status: 1
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        signupDate: currentDate,
                        membershipType: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of Customers', async () => {
                const returnedFromService = Object.assign(
                    {
                        firstName: 'BBBBBB',
                        lastName: 'BBBBBB',
                        middleName: 'BBBBBB',
                        dob: 'BBBBBB',
                        email: 'BBBBBB',
                        cellNumber: 'BBBBBB',
                        businessPhone: 'BBBBBB',
                        signupDate: currentDate.format(DATE_TIME_FORMAT),
                        membershipType: currentDate.format(DATE_TIME_FORMAT),
                        tip: 1,
                        jobTitle: 'BBBBBB',
                        status: 1
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        signupDate: currentDate,
                        membershipType: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a Customers', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
