export interface IOrderComment {
    id?: number;
    ordComment?: any;
}

export class OrderComment implements IOrderComment {
    constructor(public id?: number, public ordComment?: any) {}
}
