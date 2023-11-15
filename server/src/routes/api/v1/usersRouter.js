import express from "express";
import passport from "passport";

import { User, Chat } from "../../../models/index.js";
import { ValidationError } from "objection";

const usersRouter = new express.Router();

usersRouter.get("/", async (req, res) => {
  try {
    const users = await User.query();

    res.status(200).json({ users: users });
  } catch (error) {
    res.status(500).json({ errors: error });
  }
});

usersRouter.get("/chats", async (req, res) => {
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

usersRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.query().findById(id);

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

usersRouter.post("/", async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;
  try {
    const persistedUser = await User.query().insertAndFetch({ email, password });
    return req.login(persistedUser, () => {
      return res.status(201).json({ user: persistedUser });
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ errors: error });
  }
});

export default usersRouter;
