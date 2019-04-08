import { Moment } from 'moment';

export interface ITimesheet {
    id?: number;
    dateTime?: Moment;
    punchInTime?: Moment;
    punchOutTime?: Moment;
    breakTimeOut?: Moment;
    breakTimeIn?: Moment;
    employeeId?: number;
    businessId?: number;
}

export class Timesheet implements ITimesheet {
    constructor(
        public id?: number,
        public dateTime?: Moment,
        public punchInTime?: Moment,
        public punchOutTime?: Moment,
        public breakTimeOut?: Moment,
        public breakTimeIn?: Moment,
        public employeeId?: number,
        public businessId?: number
    ) {}
}
