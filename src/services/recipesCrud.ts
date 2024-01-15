import RecipeModel from "../model/recipeModel";
import NotFoundError from "../error/notFoundError";
import RecipeCategoryModel from "../model/RecipeCategoryModel";
import categoryModel from "../model/categoryModel";
import {
  createRecipePayloadInterface,
  updateRecipePayloadInterface,
} from "../interface/recipe";

export const getRecipeById = async (id: number) => {
  const data = await RecipeModel.getById(id);

  if (!data) {
    throw new NotFoundError(`Recipe with id: ${id} not found`);
  }
  const categories = await RecipeCategoryModel.getAll(id);
  // console.log(categories);


  const response = {...data, categories}

  return response;
};

export const createRecipe = async (
  data: createRecipePayloadInterface,
  categories: string[]
) => {
  const recipeData = {
    ...data,
    ingredients: JSON.stringify(data.ingredients),
  };
  
  const recipeId:any = await RecipeModel.create(recipeData);

if (categories.length > 0) {
  for (const category of categories) {
    const categoryIdArray: any = await categoryModel.create(category);

    if (categoryIdArray.length > 0) {
      const categoryId = categoryIdArray[0].id;

      console.log('category', recipeId);

    
      const da = await RecipeCategoryModel.create({ recipe_id: recipeId[0].id, category_id: categoryId });

      console.log('da', da)
    } else {
      console.error('No category ID returned from categoryModel.create');
    }
  }
}

 
};

export const updateRecipe = async (
  id: number,
  body: updateRecipePayloadInterface
) => {
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
export const getRecipesByUserId = async (userId: number) => {
  const recipes = await RecipeModel.getByUserId(userId);

  if (!recipes || recipes.length === 0) {
    throw new NotFoundError(`Recipes for user with id: ${userId} not found`);
  }

  return {
    data: recipes,
  };
};

