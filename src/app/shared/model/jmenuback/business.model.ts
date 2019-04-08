import { Moment } from 'moment';
import { IMembership } from 'app/shared/model/jmenuback/membership.model';
import { IEmployee } from 'app/shared/model/jmenuback/employee.model';
import { ILocation } from 'app/shared/model/jmenuback/location.model';
import { ISchedule } from 'app/shared/model/jmenuback/schedule.model';
import { ITimesheet } from 'app/shared/model/jmenuback/timesheet.model';

export interface IBusiness {
    id?: number;
    businessName?: string;
    businessType?: string;
    description?: any;
    signupDate?: Moment;
    businessCellphone?: string;
    businessPhone1?: string;
    businessPhone2?: string;
    businessPhone3?: string;
    status?: number;
    employeeId?: number;
    memberships?: IMembership[];
    employees?: IEmployee[];
    locations?: ILocation[];
    schedules?: ISchedule[];
    timesheets?: ITimesheet[];
}

export class Business implements IBusiness {
    constructor(
        public id?: number,
        public businessName?: string,
        public businessType?: string,
        public description?: any,
        public signupDate?: Moment,
        public businessCellphone?: string,
        public businessPhone1?: string,
        public businessPhone2?: string,
        public businessPhone3?: string,
        public status?: number,
        public employeeId?: number,
        public memberships?: IMembership[],
        public employees?: IEmployee[],
        public locations?: ILocation[],
        public schedules?: ISchedule[],
        public timesheets?: ITimesheet[]
    ) {}
}
