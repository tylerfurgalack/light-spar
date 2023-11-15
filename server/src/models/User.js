/* eslint-disable import/no-extraneous-dependencies */
const Bcrypt = require("bcrypt");
const unique = require("objection-unique");
const Model = require("./Model");

const saltRounds = 10;

const uniqueFunc = unique({
  fields: ["email"],
  identifiers: ["id"],
});

class User extends uniqueFunc(Model) {
  static get tableName() {
    return "users";
  }

  set password(newPassword) {
    this.cryptedPassword = Bcrypt.hashSync(newPassword, saltRounds);
  }

  authenticate(password) {
    return Bcrypt.compareSync(password, this.cryptedPassword);
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["email", "username", "weight", "location"],
      properties: {
        email: { type: "string", pattern: "^\\S+@\\S+\\.\\S+$" },
        cryptedPassword: { type: "string" },
        username: { type: "string", minLength: 2 },
        image: { type: "string" },
        location: { type: "string" },
        description: { type: "string" },
        weight: {
          anyOf: [
            {
              type: "integer",
            },
            {
              type: "string",
              pattern: "^(?:[0-9]|[1-9][0-9]|[1-3][0-9]{2}|400)$",
            },
          ],
        },
      },
    };
  }

  static get relationMappings() {
    const { Chat } = require("./index.js");

    return {
      chats: {
        relation: Model.HasManyRelation,
        modelClass: Chat,
        join: {
          from: "users.id",
          to: "chats.senderId",
        },
      },
    };
  }

  $formatJson(json) {
    const serializedJson = super.$formatJson(json);

    if (serializedJson.cryptedPassword) {
      delete serializedJson.cryptedPassword;
    }

    return serializedJson;
  }
}

module.exports = User;
