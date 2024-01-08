// interface User {
//   id: string;
//   firstname: string;
//   lastname: string;
//   email: string;
//   password: string;
// }

// const users: User[] = [
//   {
//     id: "1",
//     firstname: "user1",
//     lastname: "1user",
//     email: "user1@user.com",
//     password: "hashedPassword1",
//   },
//   {
//     id: "2",
//     firstname: "user2",
//     lastname: "2user",
//     email: "user1@user.com",
//     password: "hashedPassword2",
//   },
// ];
// export default users;
import BaseModel from "./baseModel";

import { ISignup } from "../interface/auth";

export default class UserModel extends BaseModel {
  static async getAll() {
    return this.queryBuilder()
      .select({
        id: "id",
        firstname: "firstname",
        lastname: "lastname",
        email: "email",
        password: "password",
      })
      .from("users");
  }

  static async getById(id: number) {
    return this.queryBuilder()
      .select({
        id: "id",
        firstname: "firstname",
        lastname: "lastname",
        email: "email",
        password: "password",
      })
      .from("users")
      .where({ id })
      .first();
  }

  static async getByEmail(email: string) {
    const user = await this.queryBuilder()
      .select({
        id: "id",
        firstname: "firstname",
        lastname: "lastname",
        email: "email",
        password: "password",
      })
      .from("users")
      .where({ email })
      .first();

    return user;
  }

  static async create(user: ISignup) {
    return this.queryBuilder().insert(user).table("users");
  }
}
