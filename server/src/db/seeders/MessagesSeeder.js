import { Message, User, Chat } from "../../models/index.js";

class MessageSeeder {
  static async seed() {
    const tyler = await User.query().findById(1);
    const mike = await User.query().findById(2);

    const messagesData = [
      {
        senderId: mike.id,
        chatId: 1,
        text: "Hey Tyler! How's it going?",
      },
      {
        senderId: tyler.id,
        chatId: 1,
        text: "Hey Mike! I'm doing well, how about you?",
      },
      {
        senderId: mike.id,
        chatId: 1,
        text: "I'm doing great, thanks for asking!",
      },
      {
        senderId: tyler.id,
        chatId: 1,
        text: "No problem, I'm always here to chat!",
      },
      {
        senderId: mike.id,
        chatId: 1,
        text: "That's awesome, I appreciate it!",
      },
      {
        senderId: tyler.id,
        chatId: 1,
        text: "Of course, anytime!",
      },
      {
        senderId: mike.id,
        chatId: 1,
        text: "I'll talk to you later, Tyler!",
      },
      {
        senderId: tyler.id,
        chatId: 1,
        text: "Sounds good, Mike! Talk to you later!",
      },
    ];
    for (const message of messagesData) {
      const currentMessage = await Message.query().findOne(message);
      if (!currentMessage) {
        await Message.query().insert(message);
      }
    }
  }
}

export default MessageSeeder;
