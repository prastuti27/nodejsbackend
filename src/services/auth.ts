import bcrypt from "bcrypt";
import users from "../model/users";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid"; // Import uuid library
import { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } from "../constant/jwt";
import config from "../config";

export const register = async (
  firstname: string,
  lastname: string,
  email: string,
  password: string
) => {
  const hashedpass = await bcrypt.hash(password, 10);
  const user = {
    id: uuidv4(), // Generate UUID for id
    firstname,
    lastname,
    email,
    password: hashedpass,
  };
  users.push(user);
  return user;
};

export const login = async (email: string, password: string) => {
  const user = users.find((user) => {
    return user.email === email;
  });

  if (!user) return null;

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) return null;

  const accessToken = jwt.sign(user, config.jwt.accessTokenSecret!, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });

  const refreshToken = jwt.sign(user, config.jwt.refreshTokenSecret!, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });

  console.log({ accessToken, refreshToken });

  return {
    accessToken,
    refreshToken,
    user,
  };
};
