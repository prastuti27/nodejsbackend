import LikeModel from "../model/likeModel";
import NotFoundError from "../error/notFoundError";

export const getAllLikesForRecipe = async (
  userId: number,
  recipeId: number
) => {
  try {
    return await LikeModel.getAllLikesForRecipe(userId, recipeId);
  } catch (error) {
    console.error("Error fetching likes for recipe:", error);
    throw error;
  }
};

export const likeRecipe = async (userId: number, recipeId: number) => {
  try {
    const existingLike = await LikeModel.getAllLikesForRecipe(userId, recipeId);

    if (existingLike.length !== 0) {
      throw new Error(
        `User with id: ${userId} has already liked recipe with id: ${recipeId}`
      );
    }

    const likedRecipe = await LikeModel.likeRecipe(userId, recipeId);

    return likedRecipe;
  } catch (error) {
    console.error("Error liking recipe:", error);
    throw error;
  }
};

export const unlikeRecipe = async (userId: number, recipeId: number) => {
  try {
    const existingLike = await LikeModel.getAllLikesForRecipe(userId, recipeId);

    if (existingLike.length === 0) {
      throw new NotFoundError(
        `User with id: ${userId} has not liked recipe with id: ${recipeId}`
      );
    }

    await LikeModel.unlikeRecipe(userId, recipeId);
  } catch (error) {
    console.error("Error unliking recipe:", error);
    throw error;
  }
};

export const getLikeCountForRecipe = async (recipeId: number) => {
  try {
    return await LikeModel.getLikeCountForRecipe(recipeId);
  } catch (error) {
    console.error("Error getting like count for recipe:", error);
    throw error;
  }
};
