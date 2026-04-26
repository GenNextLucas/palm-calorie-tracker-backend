import prisma from '../config/dbConnection.js';
import { FoodDTO } from '../models/food.model.js';

export class FoodService {
    async createFood(payload: FoodDTO) {
        return await prisma.food.create({
            data: payload
        });
    }

    async getAllFoods() {
        return await prisma.food.findMany({
            where: {
               active: true
            },
            orderBy: {
                name: 'asc'
            }
        });
    }

    async createManyFoods(foods: FoodDTO[]) {
        const incomingNames = foods.map(food => food.name);

        const existingFoods = await prisma.food.findMany({
            where: {
                name: { in: incomingNames }
            },
            select: { name: true }
        });

        const existingNames = existingFoods.map(f => f.name);

        const newFoodsOnly = foods.filter(f => !existingNames.includes(f.name));

        if (newFoodsOnly.length === 0) {
            return { count: 0, message: 'All foods already exist in database'};
        }

        await prisma.food.createMany({
            data: newFoodsOnly
        });

        const createdFoods = await prisma.food.findMany({
            where: {
                name: { in: newFoodsOnly.map(f => f.name) }
            }
        });

        return createdFoods;
    }

    async updateFood(payload: FoodDTO) {
        
        if (!payload.id) {
            throw new Error(`There is no ID in the payload`);
        }

        const existingName = await prisma.food.findFirst({
            where: {
                name: payload.name,
                id: {not: payload.id}
            }
        });
        
        if (existingName) {
            throw new Error(`A food named "${payload.name} already exists"`);
        }

        return await this.executeUpdate(payload.id, payload)
    }

    async deleteFood(id: number) {
        return await this.executeUpdate(id, {active: false });
    }

    private async executeUpdate(id: number, data: any) {
        try {
            return await prisma.food.update({
                where: { id },
                data: data
            });
        } catch (error: any) {
            if (error.code === 'P2025') {
                throw new Error(`Food with ID ${id} was not found`)
            }
            throw error;
        }
    }
}