import { Request, Response, NextFunction } from "express";
import {
  getAllLikesForRecipe,
  likeRecipe,
  unlikeRecipe,
  getLikeCountForRecipe,
} from "../services/likeservice";

interface AuthenticatedRequest extends Request {
  user?: { id: number  };
}

// Get All Likes for Recipe Controller
export const getAllLikesForRecipeController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id || 0; // Provide a default or placeholder value
    const recipeId = +req.params.recipeId;
    const likes = await getAllLikesForRecipe(userId, recipeId);
    res.json(likes);
  } catch (error) {
    next(error);
  }
};

// Like Recipe Controller
export const likeRecipeController = async (
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
    const likedRecipe = await likeRecipe(userId, recipeId);
    res.json({ likedRecipe, message: "Recipe liked successfully" });
  } catch (error) {
    next(error);
  }
};

// Unlike Recipe Controller
export const unlikeRecipeController = async (
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
    await unlikeRecipe(userId, recipeId);
    res.json({ message: "Recipe unliked successfully" });
  } catch (error) {
    next(error);
  }
};

// Get Like Count for Recipe Controller
export const getLikeCountForRecipeController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const recipeId = +req.params.recipeId;
    const likeCount = await getLikeCountForRecipe(recipeId);
    res.json({ likeCount });
  } catch (error) {
    next(error);
  }
};
