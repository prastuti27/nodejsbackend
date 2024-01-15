
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
