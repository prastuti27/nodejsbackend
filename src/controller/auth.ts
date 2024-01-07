import { Request, Response } from "express";
import { register, login } from "../services/auth";

export const registerUsers = async (req: Request, res: Response) => {
  const { firstname, lastname, email, password } = req.body;
  const user = await register(firstname, lastname, email, password);
  res.json({ user });
};
export const loginUsers = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await login(email, password);
  res.json({ user });
};
