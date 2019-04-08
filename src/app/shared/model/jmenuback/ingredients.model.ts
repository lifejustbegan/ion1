export interface IIngredients {
    id?: number;
    ingredientName?: string;
}

export class Ingredients implements IIngredients {
    constructor(public id?: number, public ingredientName?: string) {}
}
