import { Moment } from 'moment';

export interface ICharge {
    id?: number;
    chargeAmount?: number;
    reasonForCharge?: string;
    chargedTime?: Moment;
}

export class Charge implements ICharge {
    constructor(public id?: number, public chargeAmount?: number, public reasonForCharge?: string, public chargedTime?: Moment) {}
}
