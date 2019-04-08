export interface IPayment {
    id?: number;
    amount?: number;
    reason?: string;
}

export class Payment implements IPayment {
    constructor(public id?: number, public amount?: number, public reason?: string) {}
}
