
import CommentModel from "../model/commentModel";
import NotFoundError from "../error/notFoundError";

export const getCommentsByRecipeId = async (recipeId: number) => {
  const comments = await CommentModel.getCommentsByRecipeId(recipeId);
  return comments;
};

export const createComment = async (recipeId: number, comment: any) => {
  await CommentModel.addComment(recipeId, comment);
};

export const updateComment = async (commentId: number, updatedComment: any) => {
  const comment = await CommentModel.updateComment(commentId, updatedComment);
  if (!comment) {
    throw new NotFoundError(`Comment with id ${commentId} not found`);
  }
  return comment;
};

export const deleteComment = async (commentId: number): Promise<boolean> => {
  const comment = await CommentModel.deleteComment(commentId);
  if (!comment) {
    throw new NotFoundError(`Comment with id ${commentId} not found`);
  }
  return true;
};
