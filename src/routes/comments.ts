import { Router } from "express";
import {
  createCommentController,
  getCommentsByRecipeIdController,
  updateCommentController,
  deleteCommentController,
} from "../controller/comments";
import { genericErrorHandler } from "../middleware/errorHandler";

const router = Router();

router.post("/recipes/:recipeId/comments", createCommentController);
router.get("/recipes/:recipeId/comments", getCommentsByRecipeIdController);
router.put("/recipes/:recipeId/comments/:commentId", updateCommentController);
router.delete(
  "/recipes/:recipeId/comments/:commentId",
  deleteCommentController
);

router.use(genericErrorHandler);

export default router;
