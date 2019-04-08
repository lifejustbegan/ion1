import { Moment } from 'moment';
import { IEmployee } from 'app/shared/model/jmenuback/employee.model';

export interface ISchedule {
    id?: number;
    scheduleName?: string;
    shiftStartTime?: Moment;
    employees?: IEmployee[];
    businessId?: number;
}

export class Schedule implements ISchedule {
    constructor(
        public id?: number,
        public scheduleName?: string,
        public shiftStartTime?: Moment,
        public employees?: IEmployee[],
        public businessId?: number
    ) {}
}
