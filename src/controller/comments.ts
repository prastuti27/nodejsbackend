
import { Request, Response, NextFunction } from "express";
import * as CommentService from "../services/commentsCrud";
import NotFoundError from "../error/notFoundError";

export const getCommentsByRecipeIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { recipeId } = req.params;
    const comments = await CommentService.getCommentsByRecipeId(
      parseInt(recipeId, 10)
    );

    res.json(comments);
  } catch (error) {
    next(error);
  }
};

export const createCommentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { recipeId } = req.params;
    const { text, createdBy, createdAt } = req.body;
    const comment = { text, createdBy, createdAt };

    await CommentService.createComment(parseInt(recipeId, 10), comment);

    res.status(201).json({ message: "Comment created successfully" });
  } catch (error) {
    next(error);
  }
};

export const updateCommentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { commentId } = req.params;
    const updatedComment = req.body;
    const comment = await CommentService.updateComment(
      parseInt(commentId, 10),
      updatedComment
    );

    if (!comment) {
      throw new NotFoundError(`Comment with id ${commentId} not found`);
    }

    res.json({ message: "Comment updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteCommentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { commentId } = req.params;
    const comment = await CommentService.deleteComment(parseInt(commentId, 10));

    if (!comment) {
      throw new NotFoundError(`Comment with id ${commentId} not found`);
    }

    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    next(error);
  }
};
