const Model = require("./Model");

class Chat extends Model {
  static get tableName() {
    return "chats";
  }

  static get relationMappings() {
    const { User } = require("./index.js");

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "chats.senderId",
          to: "users.id",
        },
      },
    };
  }
}

module.exports = Chat;
