export interface ITables {
    id?: number;
    tableName?: string;
    tableNumber?: number;
    description?: any;
}

export class Tables implements ITables {
    constructor(public id?: number, public tableName?: string, public tableNumber?: number, public description?: any) {}
}
