import { NextFunction, Request, Response } from "express";

import * as userService from "../services/user";

export const getAll = async (_req: Request, res: Response) => {
  const data = await userService.getAll();

  return res.json({
    data,
  });
};

export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);

    const data = await userService.getById(id);

    return res.json({
      data,
    });
  } catch (error) {
    next(error);
  }
};
