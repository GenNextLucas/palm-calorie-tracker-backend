import type { Request, Response } from "express";
import { FoodService } from "../services/food.service.js";
import { FoodDTO } from "../models/food.model.js";

const foodService = new FoodService();

export class FoodController {

    async handleCreateFood(req: Request, res: Response) {
        try {
            const foodData = new FoodDTO(req.body);
            const food = await foodService.createFood(foodData);
            res.status(201).json(food);
        } catch (error: any) {
            console.log(error);
            res.status(400).send("something wrong happened");
        } 
    };

    async handleGetFoods(req: Request, res: Response) {
        try {
            const foods = await foodService.getAllFoods();
            res.status(200).json(foods); 
        } catch (error: any) {
            console.error("Get Foods Error:", error);
            res.status(500).send("Failed to retrieve food data.")
        }
    }

    async handleCreateManyFoods (req: Request, res: Response) {
        try {
            if (!Array.isArray(req.body))
                return res.status(400).send("Array expected");

            const foodDataList = req.body.map(item => new FoodDTO(item));
            const result = await foodService.createManyFoods(foodDataList);

            res.status(201).json({
               status: 'success',
               message: result.length === 0 ? 'No new records were added' : 'Multi insert was completed'
            })

        } catch (error: any) {
            res.status(500).json({ error: 'Bulk operation failed' });
        }
    }

    async handleUpdateFood(req: Request, res: Response) {
        const updateData = req.body;
        try {
            const result = await foodService.updateFood(updateData);
            res.status(200).json(result);
        } catch (error: any) {
            if (error.message.includes('already exists')) {
              res.status(409).json({error: error.message })  
            }
            res.status(500).json({error: 'Failed to update food' })
        }
    }

    async handleDeleteFood(req: Request, res: Response) {
        const id = parseInt(req.params.id); // Get ID from URL /api/foods/:id
    
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }
    
        try {
            await foodService.deleteFood(id);
            // 200 OK or 204 No Content
            res.status(200).json({ message: "Food deleted successfully" });
        } catch (error: any) {
            // This catches the 'ID not found' error from your Service
            res.status(404).json({ message: error.message });
        }
    }
}