import { Router } from 'express';
import { MealController } from '../controllers/meal.controller.js';

const router = Router();
const mealController = new MealController;

router.post('/', mealController.create);
router.get('/', mealController.getAll);

export default router;