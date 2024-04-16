/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("messages", (table) => {
    table.bigIncrements("id");
    table.bigInteger("chatId").unsigned().notNullable().index().references("chats.id");
    table.bigInteger("senderId").unsigned().notNullable().index().references("users.id");
    table.text("text").notNullable();
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("messages");
};
