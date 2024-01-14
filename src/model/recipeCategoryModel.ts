import BaseModel from "./baseModel";

export default class RecipeCategoryModel extends BaseModel {
  static async getAll(recipeId: number) {
    return this.queryBuilder()
      .select({
        categoryName: "c.name",
      })
      .table({ rc: "recipe_categories" })
      .innerJoin("categories as c", "rc.category_id", "c.id")
      .where({ "rc.recipe_id": recipeId });
  }

  static async create(recipe_category: any) {

    console.log({recipe_category})
    return this.queryBuilder()
      .returning("id")
      .insert(recipe_category)
      .table("recipe_categories");
  }

  static async update(id: number, recipe_category: any) {
    recipe_category.updated_at = this.queryBuilder().fn.now();
    return this.queryBuilder()
      .update(recipe_category)
      .table("recipe_categories")
      .where({ id });
  }

  static async delete(id: number) {
    return this.queryBuilder().table("recipe_categories").where({ id }).del();
  }
}
