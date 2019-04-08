export interface IHappyHour {
    id?: number;
    newPrice?: number;
    byCategorie?: string;
}

export class HappyHour implements IHappyHour {
    constructor(public id?: number, public newPrice?: number, public byCategorie?: string) {}
}
