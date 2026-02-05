export class FoodDTO {
    id?: number;
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    refVal: number;
    uom: string;
    quantity: number;


    constructor(data: Partial<FoodDTO>) {
        this.id = data.id || 0;
        this.name = data.name || '';
        this.calories = data.calories || 0;
        this.protein = data.protein || 0;
        this.carbs = data.carbs || 0;
        this.fat = data.fat || 0;
        this.refVal = data.refVal || 100;
        this.uom = data.uom || 'g';
        this.quantity = data.quantity || 0;
    }

}