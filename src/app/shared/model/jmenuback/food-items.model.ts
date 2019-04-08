export interface IFoodItems {
    id?: number;
    itemName?: string;
    description?: any;
    price?: number;
    calories?: number;
}

export class FoodItems implements IFoodItems {
    constructor(public id?: number, public itemName?: string, public description?: any, public price?: number, public calories?: number) {}
}
