import SavedRecipeModel from "../model/savedRecipeModel";
import RecipeModel from "../model/recipeModel";
import NotFoundError from "../error/notFoundError";

export const getAllSavedRecipes = async (userId: number) => {
  return SavedRecipeModel.getAllSavedRecipes(userId);
};

export const saveRecipe = async (userId: number, recipeId: number) => {
  const existingSavedRecipe = await SavedRecipeModel.getAllSavedRecipes(
    userId,
    recipeId
  );
  console.log(existingSavedRecipe);

  if (existingSavedRecipe.length !== 0) {
    throw new Error(
      `Recipe with id: ${recipeId} is already saved by user with id: ${userId}`
    );
  }

  const recipe = await RecipeModel.getById(recipeId);
  console.log({ recipe });

  if (!recipe) {
    throw new NotFoundError(`Recipe with id: ${recipeId} not found`);
  }

  const savedRecipe = await SavedRecipeModel.saveRecipe(userId, recipeId);

  return savedRecipe;
};

export const unsaveRecipe = async (userId: number, recipeId: number) => {
  const savedRecipe = await SavedRecipeModel.getAllSavedRecipes(userId);

  if (!savedRecipe) {
    throw new NotFoundError(
      `Recipe with id: ${recipeId} is not saved by user with id: ${userId}`
    );
  }

  await SavedRecipeModel.unsaveRecipe(userId, recipeId);
};
