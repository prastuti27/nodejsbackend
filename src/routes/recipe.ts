import { Router } from "express";

import {
  createRecipeController,
  getRecipeByIdController,
  getAllRecipesController,
  updateRecipeController,
  deleteRecipeController,
} from "../controller/recipes";
import { genericErrorHandler } from "../middleware/errorHandler";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/recipes",authMiddleware,createRecipeController);
router.get("/recipes/:recipeId", getRecipeByIdController);
router.get("/recipes", authMiddleware,getAllRecipesController);
router.put("/recipes/:recipeId", updateRecipeController);
router.delete("/recipes/:recipeId", deleteRecipeController);
router.use(genericErrorHandler );

export default router;
