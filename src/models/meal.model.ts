import { FoodDTO } from "./food.model.js";

export class MealDTO {
    id?: number;
    name: string;
    items: FoodDTO[]


    constructor(data: Partial<MealDTO>) {
        this.id = data.id || 0;
        this.name = data.name || '';

        this.items = Array.isArray(data.items)
            ? data.items.map((item) => new FoodDTO(item))
            : [];
    }

    // Or as a getter inside your MealDTO class:
    get foodNamesList(): string[] {
        return this.items.map(item => item.name);
    }

}