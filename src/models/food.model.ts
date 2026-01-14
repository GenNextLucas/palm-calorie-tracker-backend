export class FoodDTO {
    id?: number;
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    refVal: number;
    uom: string;


    constructor(data: Partial<FoodDTO>) {
        this.id = data.id || 0;
        this.name = data.name || '';
        this.calories = data.calories || 0;
        this.protein = data.protein || 0;
        this.carbs = data.carbs || 0;
        this.fat = data.fat || 0;
        this.refVal = data.refVal || 100; // Defaulting to 100g as seen in your UI
        this.uom = data.uom || 'g';
    }

}