const Model = require("./Model");

class Chat extends Model {
  static get tableName() {
    return "chats";
  }

  static get relationMappings() {
    const { User, Message } = require("./index.js");

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "chats.senderId",
          to: "users.id",
        },
      },
      messages: {
        relation: Model.HasManyRelation,
        modelClass: Message,
        join: {
          from: "chats.id",
          to: "messages.chatId",
        },
      },
    };
  }
}

module.exports = Chat;
