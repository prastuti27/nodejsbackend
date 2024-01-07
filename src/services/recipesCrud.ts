import RecipeModel from "../model/recipeModel";
import NotFoundError from "../error/notFoundError";

export const getRecipeById = async (id: number) => {
  const data = await RecipeModel.getById(id);

  if (!data) {
    throw new NotFoundError(`Recipe with id: ${id} not found`);
  }

  return data;
};

export const createRecipe = async (body: any) => {
  await RecipeModel.create(body);
};

export const updateRecipe = async (id: number, body: any) => {
  const recipe = await RecipeModel.getById(id);

  if (!recipe) {
    throw new NotFoundError(`Recipe with id: ${id} not found`);
  }

  await RecipeModel.update(id, body);

  const updatedRecipe = await RecipeModel.getById(id);

  return updatedRecipe;
};

export const deleteRecipe = async (id: number) => {
  const recipe = await RecipeModel.getById(id);

  if (!recipe) {
    throw new NotFoundError(`Recipe with id: ${id} not found`);
  }

  await RecipeModel.delete(id);
};
export const getAllRecipes = async () => {
  const recipes = await RecipeModel.getAll();

  return {
    data: recipes,
  };
};
