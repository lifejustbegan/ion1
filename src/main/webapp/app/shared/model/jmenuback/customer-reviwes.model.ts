import { Moment } from 'moment';

export interface ICustomerReviwes {
    id?: number;
    review?: any;
    createdDate?: Moment;
}

export class CustomerReviwes implements ICustomerReviwes {
    constructor(public id?: number, public review?: any, public createdDate?: Moment) {}
}
