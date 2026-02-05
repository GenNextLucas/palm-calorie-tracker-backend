export class MealDetailDTO {
    id?: number
    name: string;
    calories: number; // Represents 'double' in TypeScript
    fat: number;
    protein: number;
    carbs: number;
    foodItems: Array<string>;
  
    constructor(data: Partial<MealDetailDTO>) {
      this.name = data.name || '';
      this.calories = data.calories || 0;
      this.fat = data.fat || 0;
      this.protein = data.protein || 0;
      this.carbs = data.carbs || 0;
      this.foodItems = Array.isArray(data.foodItems) ? data.foodItems : [];
    }

    static fromRawItems(name: string, items: any[]): MealDetailDTO {
        return new MealDetailDTO({
          name,
          foodItems: items.map(i => i.food.name),
          calories: Math.round(items.reduce((s, i) => s + i.calories, 0)),
          fat: Number(items.reduce((s, i) => s + i.fat, 0).toFixed(2)),
          protein: Number(items.reduce((s, i) => s + i.protein, 0).toFixed(2)),
          carbs: Number(items.reduce((s, i) => s + i.carbs, 0).toFixed(2)),
        });
    }

    
  }