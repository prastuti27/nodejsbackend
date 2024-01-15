import bcrypt from "bcrypt";
import users from "../model/users";
import jwt from "jsonwebtoken";

import { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } from "../constant/jwt";
import config from "../config";
import UserModel from "../model/users";

export const register = async (
  firstname: string,
  lastname: string,
  email: string,
  password: string
) => {
  console.log({ email });
  const emailUser = await UserModel.getByEmail(email);
  console.log({ emailUser });
  if (emailUser) return null;
  const hashedpass = await bcrypt.hash(password, 10);
  const user = await UserModel.create({
    firstname,
    lastname,
    email,
    password: hashedpass,

    // id: uuidv4(),
  });

  return user;
};

export const login = async (email: string, password: string) => {
  console.log(email)
  const user = await UserModel.getByEmail(email);
console.log(user)

if (!user) return null;
  const userDetail = {
    fullname: user.fullname,
  };



  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) return null;
  console.log("user", user);
  const accessToken = jwt.sign(user, config.jwt.accessTokenSecret!
    // expiresIn: ACCESS_TOKEN_EXPIRY,
  );

  const refreshToken = jwt.sign(user, config.jwt.refreshTokenSecret!, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });


  return {
    accessToken,
    refreshToken,
    fullname: user.firstname,
  };
};
