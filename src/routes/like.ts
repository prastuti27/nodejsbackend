import { Router } from "express";
import {
  getAllLikesForRecipeController,
  likeRecipeController,
  unlikeRecipeController,
  getLikeCountForRecipeController,
} from "../controller/like"; // Assuming the controller file for likes is likeService.ts
import { genericErrorHandler } from "../middleware/errorHandler";
import { authMiddleware } from "../middleware/authMiddleware";

const likeRouter = Router();

likeRouter.get(
  "/likes/:recipeId",
  authMiddleware,
  getAllLikesForRecipeController
);
likeRouter.post("/likes/:recipeId/like", authMiddleware, likeRecipeController);
likeRouter.delete(
  "/likes/:recipeId/unlike",
  authMiddleware,
  unlikeRecipeController
);
likeRouter.get("/likes/:recipeId/count", getLikeCountForRecipeController);
likeRouter.use(genericErrorHandler);

export default likeRouter;
