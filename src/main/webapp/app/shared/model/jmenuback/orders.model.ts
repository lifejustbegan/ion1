import { Moment } from 'moment';

export const enum Status {
    OPEN = 'OPEN',
    CLOSED = 'CLOSED',
    CANCELED = 'CANCELED'
}

export interface IOrders {
    id?: number;
    orderID?: string;
    orderName?: string;
    placedTime?: Moment;
    closedTime?: Moment;
    totalClosed?: number;
    orderStatus?: Status;
    employeeId?: number;
}

export class Orders implements IOrders {
    constructor(
        public id?: number,
        public orderID?: string,
        public orderName?: string,
        public placedTime?: Moment,
        public closedTime?: Moment,
        public totalClosed?: number,
        public orderStatus?: Status,
        public employeeId?: number
    ) {}
}
