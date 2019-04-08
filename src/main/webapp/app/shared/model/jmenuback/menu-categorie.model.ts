export interface IMenuCategorie {
    id?: number;
    catName?: string;
    description?: any;
}

export class MenuCategorie implements IMenuCategorie {
    constructor(public id?: number, public catName?: string, public description?: any) {}
}
