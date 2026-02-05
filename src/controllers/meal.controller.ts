import type { Request, Response } from 'express';
import { MealService } from '../services/meal.service.js';
import { MealDTO } from '../models/meal.model.js';

export class MealController {
  private mealService: MealService;

  constructor() {
    // Instantiate the service as a field
    this.mealService = new MealService();
  }

  /**
   * Logs a new meal with multiple food items
   */
  create = async (req: Request, res: Response) => {
    try {
      // Wrap the incoming body in your DTO for validation/formatting
      const mealData = new MealDTO(req.body);

      const newMeal = await this.mealService.createMeal(mealData);
      
      res.status(201).json(newMeal);
    } catch (error) {
      console.error("Error in MealController.create:", error);
      res.status(500).json({ error: "Internal Server Error while saving meal." });
    }
  };

  /**
   * Retrieves all logged meals with their nested food details
   */
  getAll = async (_req: Request, res: Response) => {
    try {
      const meals = await this.mealService.getAllMeals();
      res.status(200).json(meals);
    } catch (error) {
      console.error("Error in MealController.getAll:", error);
      res.status(500).json({ error: "Internal Server Error while fetching meals." });
    }
  };
}
