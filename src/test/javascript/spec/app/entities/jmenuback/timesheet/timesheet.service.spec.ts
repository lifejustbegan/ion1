/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { TimesheetService } from 'app/entities/jmenuback/timesheet/timesheet.service';
import { ITimesheet, Timesheet } from 'app/shared/model/jmenuback/timesheet.model';

describe('Service Tests', () => {
    describe('Timesheet Service', () => {
        let injector: TestBed;
        let service: TimesheetService;
        let httpMock: HttpTestingController;
        let elemDefault: ITimesheet;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(TimesheetService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new Timesheet(0, currentDate, currentDate, currentDate, currentDate, currentDate);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        dateTime: currentDate.format(DATE_TIME_FORMAT),
                        punchInTime: currentDate.format(DATE_TIME_FORMAT),
                        punchOutTime: currentDate.format(DATE_TIME_FORMAT),
                        breakTimeOut: currentDate.format(DATE_TIME_FORMAT),
                        breakTimeIn: currentDate.format(DATE_TIME_FORMAT)
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

            it('should create a Timesheet', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        dateTime: currentDate.format(DATE_TIME_FORMAT),
                        punchInTime: currentDate.format(DATE_TIME_FORMAT),
                        punchOutTime: currentDate.format(DATE_TIME_FORMAT),
                        breakTimeOut: currentDate.format(DATE_TIME_FORMAT),
                        breakTimeIn: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        dateTime: currentDate,
                        punchInTime: currentDate,
                        punchOutTime: currentDate,
                        breakTimeOut: currentDate,
                        breakTimeIn: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new Timesheet(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a Timesheet', async () => {
                const returnedFromService = Object.assign(
                    {
                        dateTime: currentDate.format(DATE_TIME_FORMAT),
                        punchInTime: currentDate.format(DATE_TIME_FORMAT),
                        punchOutTime: currentDate.format(DATE_TIME_FORMAT),
                        breakTimeOut: currentDate.format(DATE_TIME_FORMAT),
                        breakTimeIn: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        dateTime: currentDate,
                        punchInTime: currentDate,
                        punchOutTime: currentDate,
                        breakTimeOut: currentDate,
                        breakTimeIn: currentDate
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

            it('should return a list of Timesheet', async () => {
                const returnedFromService = Object.assign(
                    {
                        dateTime: currentDate.format(DATE_TIME_FORMAT),
                        punchInTime: currentDate.format(DATE_TIME_FORMAT),
                        punchOutTime: currentDate.format(DATE_TIME_FORMAT),
                        breakTimeOut: currentDate.format(DATE_TIME_FORMAT),
                        breakTimeIn: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        dateTime: currentDate,
                        punchInTime: currentDate,
                        punchOutTime: currentDate,
                        breakTimeOut: currentDate,
                        breakTimeIn: currentDate
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

            it('should delete a Timesheet', async () => {
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
