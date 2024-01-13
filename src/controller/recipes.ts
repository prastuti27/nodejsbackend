// recipesController.ts
import { Request, Response, NextFunction } from "express";
import {
  createRecipe,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  getAllRecipes,
} from "../services/recipesCrud";
import { cloudinaryUpload } from "../utils/cloudinary";
import { createRecipePayloadInterface } from "../interface/recipe";

// interface ExtendedRequest extends Request {
//   user_id: number;
// }
// Get All Recipes Controller
export const getAllRecipesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const recipes = await getAllRecipes();
    res.json(recipes);
  } catch (error) {
    next(error);
  }
};

interface ExtendedRequest extends Request{
  
    created_by:number;
    // firstname:string;
  }

// Create Recipe Controller
export const createRecipeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const extendedRequest = req as ExtendedRequest
  try {
    const { categories,created_by,...recipeDetails } = extendedRequest.body;
console.log({recipeDetails})

const data :createRecipePayloadInterface={
...recipeDetails,created_by:extendedRequest.created_by
}

console.log("hey",data)
// const {id}= extendedRequest.user 
// recipeDetails.created_by= id
recipeDetails.photo=await cloudinaryUpload(recipeDetails.photo)
    const recipeId = await createRecipe(data,categories);
    res.status(201).json({ recipeId });
  } catch (error) {
    next(error);
  }
};

// Read Recipe Controller
export const getRecipeByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const recipeId = parseInt(req.params.recipeId, 10);
    const recipe = await getRecipeById(recipeId);
    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Update Recipe Controller
export const updateRecipeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const recipeId = parseInt(req.params.recipeId, 10);
    const updatedFields = req.body;
    const success = await updateRecipe(recipeId, updatedFields);
    if (success) {
      res.json({ message: "Recipe updated successfully" });
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Delete Recipe Controller
export const deleteRecipeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const recipeId = parseInt(req.params.recipeId, 10);
    await deleteRecipe(recipeId);
    res.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res
      .status(404)
      .json({ message: "Recipe not found or could not be deleted" });
  }
};
