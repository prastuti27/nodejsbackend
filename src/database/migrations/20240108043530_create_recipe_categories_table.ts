import { Knex } from "knex";

const TABLE_NAME = "recipe_categories";

/**
 * Create table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements();

    table.timestamp("created_at").notNullable().defaultTo(knex.raw("now()"));

    table.timestamp("updated_at").nullable();

    table
      .bigInteger("recipe_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("recipes")
      .onDelete("CASCADE");
    table
      .bigInteger("category_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("categories")
      .onDelete("CASCADE");
  });
}

/**
 * Drop table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
