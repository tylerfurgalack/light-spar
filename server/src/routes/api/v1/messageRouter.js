import express from "express";
import { Message, Chat } from "../../../models/index.js";

const messageRouter = new express.Router();

messageRouter.get("/", async (req, res) => {
  try {
    const chatId = req.query.chatId;
    const messages = await Message.query().where("chatId", chatId);

    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ errors: error });
  }
});

export default messageRouter;
