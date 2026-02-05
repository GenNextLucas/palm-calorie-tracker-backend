import prisma from '../config/dbConnection.js';
import type { MealDTO } from "../models/meal.model.js";
import { MealDetailDTO } from '../models/mealDetail.dto.js';



export class MealService {
    
    async createMeal(mealData: MealDTO): Promise<MealDetailDTO>  {
        const meal = await prisma.meal.create({
            data: {
                name: mealData.name,
                items: {
                    create: mealData.items.map(item => ({
                        calories: item.calories,
                        protein: item.protein,
                        carbs: item.carbs,
                        fat: item.fat,
                        quantity: item.quantity,
                        unit: item.uom,
                        food: {
                            connect: { id: Number(item.id) }
                        }
                    }))
                }
            },
            include: {
                items: true
            },
        });

        return MealDetailDTO.fromRawItems(meal.name, meal.items);
    }

    async getAllMeals(): Promise<MealDetailDTO[]> {
        const meals = await prisma.meal.findMany({
          include: {
            items: {
              include: { food: true } // Fetches the full original Food object too
            }
          },
          orderBy: { createdAt: 'desc' }
        });

        return meals.map(meal => MealDetailDTO.fromRawItems(meal.name, meal.items));

      }
}