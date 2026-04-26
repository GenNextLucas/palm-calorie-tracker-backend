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


    /**
     * GET /api/meals/:id
     */
  getMealById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // 1. Validation: Ensure ID is a valid number
        if (isNaN(Number(id))) {
            return res.status(400).json({ message: "Invalid Meal ID format" });
        }

        // 2. Service Call: Fetches the formatted MealResponseDTO
        const meal = await this.mealService.getMealById(Number(id));

        // 3. Success: Return the clean payload for your React frontend
        return res.status(200).json(meal);

    } catch (error: any) {
        // 4. Error Handling
        if (error.message.includes("not found")) {
            return res.status(404).json({ message: error.message });
        }

        console.error("Error in getMealById Controller:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
  };



  updateMeal = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const mealData = new MealDTO(req.body);
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: "A valid Meal ID is required" });
        }

        if (!mealData.items || mealData.items.length === 0) {
            return res.status(400).json({ message: "Meal must have at least one food item" });
        }

        const updatedMeal = await this.mealService.updateMeal(Number(id), mealData);

      
        return res.status(200).json(updatedMeal);

    } catch (error: any) {
        console.error("Error updating meal:", error);
        
        if (error.message.includes("not found")) {
            return res.status(404).json({ message: error.message });
        }

        return res.status(500).json({ message: "Internal server error during update" });
    }
  };
}
