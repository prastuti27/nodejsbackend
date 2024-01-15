import BaseModel from "./baseModel";

export default class SavedRecipeModel extends BaseModel {
  static async getAllSavedRecipes(userId: number, recipeId?: number) {
    let query = this.queryBuilder()
    .select({
      id: "saved_recipe.id",
      userId: "saved_recipe.user_id",
      savedrecipeId: "saved_recipe.recipe_id",
      photo: "recipes.photo", 
      title: "recipes.title",
      description: "recipes.description",
      recipeId:"recipe_id"
     
    })
    .from("saved_recipe")
    .leftJoin("recipes", "saved_recipe.recipe_id", "recipes.id")
    .where({ "saved_recipe.user_id": userId });

  if (recipeId !== undefined) {
    query = query.andWhere({ "saved_recipe.recipe_id": recipeId });
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
