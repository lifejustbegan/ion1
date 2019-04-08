import { Moment } from 'moment';
import { ITimesheet } from 'app/shared/model/jmenuback/timesheet.model';
import { ILocation } from 'app/shared/model/jmenuback/location.model';
import { IBusiness } from 'app/shared/model/jmenuback/business.model';
import { IEmployeeComment } from 'app/shared/model/jmenuback/employee-comment.model';
import { IOrders } from 'app/shared/model/jmenuback/orders.model';
import { ISchedule } from 'app/shared/model/jmenuback/schedule.model';

export const enum JobType {
    OWNER = 'OWNER',
    MANAGER = 'MANAGER',
    FINNANCE = 'FINNANCE',
    EMPLOYEE = 'EMPLOYEE',
    SUPPLIER = 'SUPPLIER'
}

export interface IEmployee {
    id?: number;
    firstName?: string;
    lastName?: string;
    middleName?: string;
    dob?: string;
    jobTitle?: JobType;
    email?: string;
    phoneNumber?: string;
    hireDate?: Moment;
    salary?: number;
    hourlyRate?: number;
    tip?: number;
    status?: string;
    timesheets?: ITimesheet[];
    locations?: ILocation[];
    businesses?: IBusiness[];
    comments?: IEmployeeComment[];
    orders?: IOrders[];
    schedules?: ISchedule[];
    businessId?: number;
}

export class Employee implements IEmployee {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public middleName?: string,
        public dob?: string,
        public jobTitle?: JobType,
        public email?: string,
        public phoneNumber?: string,
        public hireDate?: Moment,
        public salary?: number,
        public hourlyRate?: number,
        public tip?: number,
        public status?: string,
        public timesheets?: ITimesheet[],
        public locations?: ILocation[],
        public businesses?: IBusiness[],
        public comments?: IEmployeeComment[],
        public orders?: IOrders[],
        public schedules?: ISchedule[],
        public businessId?: number
    ) {}
}
