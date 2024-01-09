// import CommentModel from "../model/commentModel";
// import NotFoundError from "../error/notFoundError";

// export const getCommentsByRecipeId = async (recipeId: number) => {
//   const comments = await CommentModel.getByRecipeId(recipeId);

//   return comments;
// };

// export const createComment = async (recipeId: number, data: any) => {
//   // Assuming a comment has fields like content, authorId, recipeId
//   const commentData = {
//     ...data,
//     recipeId,
//   };
//   await CommentModel.create(commentData);
// };

// export const updateComment = async (recipeId: number, commentId: number, body: any) => {
//   const comment = await CommentModel.getById(commentId);

//   if (!comment || comment.recipeId !== recipeId) {
//     throw new NotFoundError(`Comment with id: ${commentId} not found for recipe ${recipeId}`);
//   }

//   await CommentModel.update(commentId, body);

//   const updatedComment = await CommentModel.getById(commentId);

//   return updatedComment;
// };

// export const deleteComment = async (recipeId: number, commentId: number) => {
//   const comment = await CommentModel.getById(commentId);

//   if (!comment || comment.recipeId !== recipeId) {
//     throw new NotFoundError(`Comment with id: ${commentId} not found for recipe ${recipeId}`);
//   }

//   await CommentModel.delete(commentId);
// };
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
