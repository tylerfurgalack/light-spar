import express from "express";
import { Chat, User } from "../../../models/index.js";

const chatsRouter = new express.Router();

chatsRouter.get("/", async (req, res) => {
  try {
    const userId = req.user.id;
    const userChats = await Chat.query().where("senderId", userId).orWhere("receiverId", userId);

    // Extracting user IDs involved in chats
    const userIDs = userChats.map((chat) => {
      return chat.senderId !== userId ? chat.senderId : chat.receiverId;
    });

    // Fetch users based on extracted IDs
    const pairedUsers = await User.query().findByIds(userIDs);

    res.status(200).json({ pairedUsers });
  } catch (error) {
    res.status(500).json({ errors: error });
  }
});

chatsRouter.get("/exists", async (req, res) => {
  try {
    const { senderId, receiverId } = req.query;

    const existingChat = await Chat.query()
      .where((query) => {
        query.where("senderId", senderId).andWhere("receiverId", receiverId);
      })
      .orWhere((query) => {
        query.where("senderId", receiverId).andWhere("receiverId", senderId);
      })
      .first();

    res.status(200).json({ exists: !!existingChat });
  } catch (error) {
    res.status(500).json({ errors: error });
  }
});

chatsRouter.post("/", async (req, res) => {
  try {
    const { senderId, receiverId } = req.body; // Assuming senderId and receiverId are provided in the request body

    // Create a new chat row
    const newChat = await Chat.query().insertAndFetch({
      senderId,
      receiverId,
      // Add any other properties needed for your chat creation
    });

    res.status(201).json({ chat: newChat });
  } catch (error) {
    res.status(500).json({ errors: error });
  }
});

chatsRouter.delete("/", async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;

    const existingChat = await Chat.query()
      .where((query) => {
        query.where("senderId", senderId).andWhere("receiverId", receiverId);
      })
      .orWhere((query) => {
        query.where("senderId", receiverId).andWhere("receiverId", senderId);
      })
      .first();

    if (existingChat) {
      // If the chat relation exists, delete it
      await Chat.query().delete().where("id", existingChat.id);
      res.status(200).json({ message: "Chat relation deleted successfully" });
    } else {
      res.status(404).json({ message: "Chat relation not found" });
    }
  } catch (error) {
    res.status(500).json({ errors: error });
  }
});

export default chatsRouter;
