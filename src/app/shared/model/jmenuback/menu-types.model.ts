export interface IMenuTypes {
    id?: number;
    menuTypeName?: string;
    description?: any;
}

export class MenuTypes implements IMenuTypes {
    constructor(public id?: number, public menuTypeName?: string, public description?: any) {}
}
