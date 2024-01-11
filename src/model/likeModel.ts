import BaseModel from "./baseModel";

export default class LikeModel extends BaseModel {
  static async getAllLikesForRecipe(userId: number, recipeId: number) {
    return this.queryBuilder()
      .select({
        id: "id",
        userId: "user_id",
        recipeId: "recipe_id",
        // createdAt: "like.created_at",
        // Add other fields as needed
      })
      .table("like")
      .where({ userId, recipeId });
  }

  static async likeRecipe(userId: number, recipeId: number) {
    return this.queryBuilder()
      .insert({ user_id: userId, recipe_id: recipeId })
      .into("like");
  }

  static async unlikeRecipe(userId: number, recipeId: number) {
    return this.queryBuilder()
      .table("like")
      .where({ user_id: userId, recipe_id: recipeId })
      .del();
  }

  static async getLikeCountForRecipe(recipeId: number) {
    return this.queryBuilder()
      .count("*", { as: "likeCount" })
      .from("like")
      .where({ recipe_id: recipeId })
      .first();
  }
}
