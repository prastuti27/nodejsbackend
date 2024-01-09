import RecipeModel from "../model/recipeModel";
import NotFoundError from "../error/notFoundError";
import RecipeCategoryModel from "../model/RecipeCategoryModel";
import categoryModel from "../model/categoryModel";

export const getRecipeById = async (id: number) => {
  const data = await RecipeModel.getById(id);

  if (!data) {
    throw new NotFoundError(`Recipe with id: ${id} not found`);
  }
  const categories = await RecipeCategoryModel.getAll(id);
  // console.log(categories);

  return data;
};

export const createRecipe = async (data: any, categories: string[]) => {
  const recipeData = {
    ...data,
    ingredients: JSON.stringify(data.ingredients),
  };
  const recipeId = await RecipeModel.create(recipeData);
  categories.forEach(async (category) => {
    const categoryId = await categoryModel.getCategoryIdByName(category);
    console.log(categoryId);
    // await RecipeCategoryModel.insert({recipeId, category.id})
  });
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
