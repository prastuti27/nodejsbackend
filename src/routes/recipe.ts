import { Router } from "express";

import {
  createRecipeController,
  getRecipeByIdController,
  getAllRecipesController,
  updateRecipeController,
  deleteRecipeController,
  getRecipesByUserController
} from "../controller/recipes";
import { genericErrorHandler } from "../middleware/errorHandler";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/recipes",authMiddleware,createRecipeController);
router.get("/recipes/:recipeId", getRecipeByIdController);
router.get("/recipes",getAllRecipesController);
router.put("/recipes/:recipeId",authMiddleware,updateRecipeController);
router.delete("/recipes/:recipeId",authMiddleware, deleteRecipeController);
router.get("/user/:userId/recipes",authMiddleware, getRecipesByUserController);
router.use(genericErrorHandler );

export default router;
