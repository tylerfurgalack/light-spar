import { User, Chat } from "../../models/index.js";

class ChatsSeeder {
  static async seed() {
    const tyler = await User.query().findById(1);
    const mike = await User.query().findById(2);
    const stamp = await User.query().findById(3);
    const ippo = await User.query().findById(4);
    const shayna = await User.query().findById(5);
    const marvin = await User.query().findById(6);
    const rodtang = await User.query().findById(7);
    const ali = await User.query().findById(8);
    const glassjoe = await User.query().findById(9);
    const mac = await User.query().findById(10);
    const bobby = await User.query().findById(11);

    const chatsData = [
      {
        senderId: mike.id,
        receiverId: tyler.id,
      },

      {
        senderId: tyler.id,
        receiverId: ippo.id,
      },
      {
        senderId: tyler.id,
        receiverId: shayna.id,
      },
      {
        senderId: ippo.id,
        receiverId: glassjoe.id,
      },
      { senderId: glassjoe.id, receiverId: rodtang.id },
      { senderId: rodtang.id, receiverId: stamp.id },
      { senderId: mac.id, receiverId: glassjoe.id },
      { senderId: mac.id, receiverId: mike.id },
      { senderId: ali.id, receiverId: mike.id },
      { senderId: shayna.id, receiverId: bobby.id },
      { senderId: ippo.id, receiverId: mike.id },
      { senderId: marvin.id, receiverId: bobby.id },
      { senderId: ippo.id, receiverId: marvin.id },
    ];

    for (const chat of chatsData) {
      const currentChat = await Chat.query().findOne(chat);
      if (!currentChat) {
        await Chat.query().insert(chat);
      }
    }
  }
}
export default ChatsSeeder;
