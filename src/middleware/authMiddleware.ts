import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

import config from "../config";

export const authMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction
) => {

  const authHeader = req.headers['authorization'];

  if(!authHeader) {
    return res.status(401).json({message: 'Unauthenticated'})
  }


  const token = authHeader.split(" ")[1] as string;

  if (!token) {
    res.status(401).json({ message: "Token not Found" });
  }

//   const decode = jwt.verify(token, config.jwt.accessTokenSecret!)as number ;
// const userId= decode.id as number
//   req.user = decode;
//   console.log("dec",decode)
//   req.userId = decode.id as number

  const user = jwt.verify(token, config.jwt.accessTokenSecret!) as {
    id: number;
  };
  console.log(user);
req.user = user
  req.created_by = user.id as number;
  console.log(req.created_by)
  next();
};
