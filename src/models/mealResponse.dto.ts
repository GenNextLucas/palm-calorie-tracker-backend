import { Prisma } from '@prisma/client';

type Meal = Prisma.MealGetPayload<{
    include: { items: { include: { food: true } } }
}>;

export class MealResponseDTO {
    id!: number | 0;
    name: string;
    items: MealItemDTO[];

    constructor(id:number, name: string, items: MealItemDTO[]) {
        this.id = id;
        this.name = name;
        this.items = items;
    }

    
    static fromEntity(meal: Meal): MealResponseDTO {
        return new MealResponseDTO(
            meal.id,
            meal.name || "New Meal",
            meal.items.map((item: any) => ({
                id: item.foodId,             
                name: item.food?.name || '',
                calories: item.calories,
                protein: item.protein,
                carbs: item.carbs,
                fat: item.fat,
                quantity: item.quantity,
                uom: item.unit
            }))
        );
    }
}

// Supporting interface for the items
interface MealItemDTO {
    id: number;
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    quantity: number;
    uom: string;
}