import { Router } from "express";
import { FoodController } from "../controllers/food.controller.js";

const router = Router();
const foodController = new FoodController();

router.post("/", foodController.handleCreateFood);
router.post("/multiple-save", foodController.handleCreateManyFoods);
router.put("/", foodController.handleUpdateFood);
router.get("/", foodController.handleGetFoods);
router.delete("/:id", foodController.handleDeleteFood);

export default router;