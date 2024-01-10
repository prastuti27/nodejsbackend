import BaseModel from "./baseModel";

export default class SavedRecipeModel extends BaseModel {
  static async getAllSavedRecipes(userId: number, recipeId?: number) {
    let query = this.queryBuilder()
      .select({
        id: "saved_recipe.id",
        userId: "saved_recipe.user_id",
        recipeId: "saved_recipe.recipe_id",
        // createdAt: "saved_recipe.created_at",
        // Add other fields as needed
      })
      .table("saved_recipe")
      .where({ user_id: userId, recipe_id: recipeId });

    if (recipeId !== undefined) {
      query = query.andWhere({ recipe_id: recipeId });
    }
    return query;
  }

  static async saveRecipe(userId: number, recipeId: number) {
    return this.queryBuilder()
      .insert({ userId, recipeId })
      .into("saved_recipe");
  }

  static async unsaveRecipe(userId: number, recipeId: number) {
    return this.queryBuilder()
      .table("saved_recipe")
      .where({ user_id: userId, recipe_id: recipeId })
      .del();
  }
}
