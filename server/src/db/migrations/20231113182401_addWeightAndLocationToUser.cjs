/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.table("users", (table) => {
    table.string("username").notNullable();
    table.integer("weight").notNullable().checkPositive();
    table.string("location").notNullable();
    table.string("description");
    table
      .string("image")
      .defaultTo(
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
      );
  });
};

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.table("users", (table) => {
    table.dropColumn("username");
    table.dropColumn("weight");
    table.dropColumn("location");
    table.dropColumn("description");
    table.dropColumn("image");
  });
};
