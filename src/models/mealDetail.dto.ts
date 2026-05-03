export class MealDetailDTO {
    id?: number
    name: string;
    calories: number; // Represents 'double' in TypeScript
    fat: number;
    protein: number;
    carbs: number;
    foodItems: Array<string>;
  
    constructor(data: Partial<MealDetailDTO>) {
      this.id = data.id || 0;
      this.name = data.name || '';
      this.calories = data.calories || 0;
      this.fat = data.fat || 0;
      this.protein = data.protein || 0;
      this.carbs = data.carbs || 0;
      this.foodItems = Array.isArray(data.foodItems) ? data.foodItems : [];
    }

    static fromRawItems(id: number, name: string, items: any[], itemNames: any[]): MealDetailDTO {
      if (!items || items.length === 0) {
        return new MealDetailDTO({
            id,
            name,
            foodItems: itemNames,
            calories: 0,
            fat: 0,
            protein: 0,
            carbs: 0,
        });
      }
      
        return new MealDetailDTO({
          id,
          name,
          foodItems:  items[0].food ? items.map(i => i.food.name) : itemNames.map((i) => i),
          calories: Math.round(items.reduce((s, i) => s + i.calories, 0)),
          fat: Number(items.reduce((s, i) => s + i.fat, 0).toFixed(2)),
          protein: Number(items.reduce((s, i) => s + i.protein, 0).toFixed(2)),
          carbs: Number(items.reduce((s, i) => s + i.carbs, 0).toFixed(2)),
        });
    }

    
  }