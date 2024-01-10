// savedRecipesController.ts
import { Request, Response, NextFunction } from "express";
import {
  getAllSavedRecipes,
  saveRecipe,
  unsaveRecipe,
} from "../services/savedRecipes";

interface AuthenticatedRequest extends Request {
  user?: { id: number /* other user properties */ };
}

// Get All Saved Recipes Controller
export const getAllSavedRecipesController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      // Handle the case where user information is not available
      return res.status(401).json({ message: "Unauthorized" });
    }

    const savedRecipes = await getAllSavedRecipes(userId);
    res.json(savedRecipes);
  } catch (error) {
    next(error);
  }
};

// Save Recipe Controller
export const saveRecipeController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const recipeId = +req.params.recipeId;
    const savedRecipe = await saveRecipe(userId, recipeId);
    res.json({ savedRecipe, message: "Recipe saved successfully" });
  } catch (error) {
    next(error);
  }
};

// Unsave Recipe Controller
export const unsaveRecipeController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const recipeId = parseInt(req.params.recipeId, 10);
    await unsaveRecipe(userId, recipeId);
    res.json({ message: "Recipe unsaved successfully" });
  } catch (error) {
    next(error);
  }
};
