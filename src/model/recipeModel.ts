

import { updateRecipePayloadInterface } from "../interface/recipe";
import BaseModel from "./baseModel";

export default class RecipeModel extends BaseModel {
  static async getAll() {
    return this.queryBuilder()
    .select('recipes.*', 'users.firstname as firstname', 'users.lastname as lastname') 
    .from('recipes')
    .leftJoin('users', 'recipes.createdBy', 'users.id');
  }

  static async getById(id: number) {
    return this.queryBuilder()
      .select('*')
      .table("recipes")
      .where({ id })
      .first();
  }
  static async getByUserId(userId: number) {
    return this.queryBuilder()
      .select('*')
      .from('recipes')
      .where({ createdBy: userId });
  }

  static async create(recipe: any) {
    return this.queryBuilder().returning("id").insert(recipe).table("recipes");
  }

  static async update(id: number, recipe: updateRecipePayloadInterface) {
    const currentDateTime = new Date();
    recipe.updatedAt = currentDateTime;

    return this.queryBuilder().update(recipe).table("recipes").where({ id });
  }

  static async delete(id: number) {
    return this.queryBuilder().table("recipes").where({ id }).del();
  }
}
