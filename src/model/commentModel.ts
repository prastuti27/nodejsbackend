import BaseModel from "./baseModel";

export default class CommentModel extends BaseModel {
  static async getCommentsByRecipeId(recipeId: number) {
    return this.queryBuilder()
      .select({
        id: "id",
        text: "text",
        createdBy: " createdBy",
      })
      .table("comments")
      .where({ recipe_id: recipeId });
  }

  static async addComment(recipeId: number, comment: any) {
    return this.queryBuilder()
      .insert({
        recipeId: recipeId,
        text: comment.text,
        createdBy: comment.createdBy,
      })
      .table("comments");
  }
  static async updateComment(commentId: number, updatedComment: any) {
    updatedComment.updated_at = this.queryBuilder().fn.now(); // Set updated_at to current date/time

    return this.queryBuilder()
      .update(updatedComment)
      .table("comments")
      .where({ id: commentId });
  }

  static async deleteComment(commentId: number) {
    return this.queryBuilder().table("comments").where({ id: commentId }).del();
  }
}
