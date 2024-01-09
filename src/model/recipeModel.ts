// export interface Recipe {
//     id: number;
//     title: string;
//     photo: string;
//     description:string;
//     ingredients: Ingredient[];
//     steps: string[];
//     created_at: Date;
//     updated_at?: Date;
//   }

//   export interface Ingredient {
//     name: string;
//     quantity: string;
//   }

// recipeModel.ts

import BaseModel from "./baseModel";

export default class RecipeModel extends BaseModel {
  static async getAll() {
    return this.queryBuilder()
      .select({
        id: "id",
        title: "title",
        description: "description",
        ingredients: "ingredients",
        instructions: "instructions",
        photo: "photo",
        createdAt: "created_at",
      })
      .table("recipes");
  }

  static async getById(id: number) {
    return this.queryBuilder()
      .select({
        id: "id",
        title: "title",
        description: "description",
        ingredients: "ingredients",
        instructions: "instructions",
        createdAt: "createdAt",
      })
      .table("recipes")
      .where({ id })
      .first();
  }

  static async create(recipe: any) {
    return this.queryBuilder().returning("id").insert(recipe).table("recipes");
  }

  static async update(id: number, recipe: any) {
    recipe.updated_at = this.queryBuilder().fn.now();
    return this.queryBuilder().update(recipe).table("recipes").where({ id });
  }

  static async delete(id: number) {
    return this.queryBuilder().table("recipes").where({ id }).del();
  }
}
