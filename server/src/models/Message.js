const { text } = require("body-parser");
const Model = require("./Model");

class Message extends Model {
  static get tableName() {
    return "messages";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["text"],
      properties: {
        text: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    const { User, Chat } = require("./index.js");

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "messages.senderId",
          to: "users.id",
        },
      },
      chat: {
        relation: Model.BelongsToOneRelation,
        modelClass: Chat,
        join: {
          from: "messages.chatId",
          to: "chats.id",
        },
      },
    };
  }
}

module.exports = Message;
