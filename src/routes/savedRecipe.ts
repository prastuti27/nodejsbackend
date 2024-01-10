import { Router } from "express";
import {
  getAllSavedRecipesController,
  saveRecipeController,
  unsaveRecipeController,
} from "../controller/saveRecipe"; // Assuming the controller file for saved recipes is savedRecipes.ts
import { genericErrorHandler } from "../middleware/errorHandler";
import { authMiddleware } from "../middleware/authMiddleware";

const savedRecipesRouter = Router();

savedRecipesRouter.get(
  "/saved-recipes",
  authMiddleware,
  getAllSavedRecipesController
);

savedRecipesRouter.post(
  "/saved-recipes/:recipeId/save",
  authMiddleware,
  saveRecipeController
);
savedRecipesRouter.delete(
  "/saved-recipes/:recipeId/unsave",
  authMiddleware,
  unsaveRecipeController
);
savedRecipesRouter.use(genericErrorHandler);

export default savedRecipesRouter;
