// recipesController.ts
import { Request, Response, NextFunction } from "express";
import {
  createRecipe,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  getAllRecipes,
} from "../services/recipesCrud";

// Get All Recipes Controller
export const getAllRecipesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const recipes = await getAllRecipes();
    res.json(recipes);
  } catch (error) {
    next(error);
  }
};

// Create Recipe Controller
export const createRecipeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const recipeId = await createRecipe(req.body);
    res.status(201).json({ recipeId });
  } catch (error) {
    next(error);
  }
};

// Read Recipe Controller
export const getRecipeByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const recipeId = parseInt(req.params.recipeId, 10);
    const recipe = await getRecipeById(recipeId);
    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Update Recipe Controller
export const updateRecipeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const recipeId = parseInt(req.params.recipeId, 10);
    const updatedFields = req.body;
    const success = await updateRecipe(recipeId, updatedFields);
    if (success) {
      res.json({ message: "Recipe updated successfully" });
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Delete Recipe Controller
export const deleteRecipeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const recipeId = parseInt(req.params.recipeId, 10);
    await deleteRecipe(recipeId);
    res.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res
      .status(404)
      .json({ message: "Recipe not found or could not be deleted" });
  }
};
