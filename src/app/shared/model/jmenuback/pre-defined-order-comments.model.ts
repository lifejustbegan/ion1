export interface IPreDefinedOrderComments {
    id?: number;
    preComment?: any;
}

export class PreDefinedOrderComments implements IPreDefinedOrderComments {
    constructor(public id?: number, public preComment?: any) {}
}
