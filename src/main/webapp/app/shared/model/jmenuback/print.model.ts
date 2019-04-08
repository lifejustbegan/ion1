import { Moment } from 'moment';

export interface IPrint {
    id?: number;
    orderID?: number;
    total?: number;
    printedTime?: Moment;
}

export class Print implements IPrint {
    constructor(public id?: number, public orderID?: number, public total?: number, public printedTime?: Moment) {}
}
