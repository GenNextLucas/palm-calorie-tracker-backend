import { Router } from 'express';
import { MealController } from '../controllers/meal.controller.js';

const router = Router();
const mealController = new MealController;

router.post('/', mealController.create);
router.get('/', mealController.getAll);
router.get('/:id', mealController.getMealById)
router.put('/:id', mealController.updateMeal);

export default router;