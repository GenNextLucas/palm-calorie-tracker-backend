import type { Prisma } from '@prisma/client';
import prisma from '../config/dbConnection.js';
import type { MealDTO } from "../models/meal.model.js";
import { MealDetailDTO } from '../models/mealDetail.dto.js';
import { MealResponseDTO } from '../models/mealResponse.dto.js';

type Meal = Prisma.MealGetPayload<{
    include: { items: { include: { food: true } } }
}>;

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


        return MealDetailDTO.fromRawItems(meal.id, meal.name, meal.items, mealData.foodNamesList);
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

        return meals.map(meal => MealDetailDTO.fromRawItems(meal.id, meal.name, meal.items, []));

    }

    async getMealById(id: number): Promise<MealResponseDTO> {
        const meal = await prisma.meal.findUnique({
            where: { id: Number(id) },
            include: {
                items: {
                    include: { food: true } // Joins with food table to get the name
                }
            }
        });
    
        if (!meal) throw new Error(`Meal with ${id} not found`);
    
        // Returns the clean payload structure
        return MealResponseDTO.fromEntity(meal as Meal);
    }

    async updateMeal(id: number, mealData: MealDTO): Promise<MealDetailDTO> {
        const updatedMeal = await prisma.meal.update({
            where: { id: Number(id) },
            data: {
                name: mealData.name,
                items: {
                    // 1. Delete all existing items for this meal first
                    deleteMany: {}, 
                    // 2. Create the new items from the current DTO state
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
    
        return MealDetailDTO.fromRawItems(
            updatedMeal.id, 
            updatedMeal.name, 
            updatedMeal.items, 
            mealData.foodNamesList
        );
    }

}


