import { Moment } from 'moment';

export const enum JobType {
    OWNER = 'OWNER',
    MANAGER = 'MANAGER',
    FINNANCE = 'FINNANCE',
    EMPLOYEE = 'EMPLOYEE',
    SUPPLIER = 'SUPPLIER'
}

export interface ICustomers {
    id?: number;
    firstName?: string;
    lastName?: string;
    middleName?: string;
    dob?: string;
    email?: string;
    cellNumber?: string;
    businessPhone?: string;
    signupDate?: Moment;
    membershipType?: Moment;
    tip?: number;
    jobTitle?: JobType;
    status?: number;
}

export class Customers implements ICustomers {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public middleName?: string,
        public dob?: string,
        public email?: string,
        public cellNumber?: string,
        public businessPhone?: string,
        public signupDate?: Moment,
        public membershipType?: Moment,
        public tip?: number,
        public jobTitle?: JobType,
        public status?: number
    ) {}
}
