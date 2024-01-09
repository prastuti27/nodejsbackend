import BaseModel from "./baseModel";

export default class categoryModel extends BaseModel {
  static async getAll() {
    return this.queryBuilder()
      .select({
        id: "id",
        categoryName: "name",
        createdAt: "created_at",
      })
      .table("categories");
  }

  static async getCategoryIdByName(name: string) {
    return this.queryBuilder()
      .select({
        id: "id",
      })
      .table("categories")
      .where({ name });
  }

  static async create(category: any) {
    return this.queryBuilder()
      .returning("id")
      .insert(category)
      .table("categories");
  }
}
