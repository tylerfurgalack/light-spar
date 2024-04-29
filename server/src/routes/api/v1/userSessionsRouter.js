import express from "express";
import passport from "passport";
import { User } from "../../../models/index.js";

const sessionRouter = new express.Router();

sessionRouter.post("/", (req, res, next) => {
  return passport.authenticate("local", (err, user) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }

    if (user) {
      return req.login(user, () => {
        return res.status(201).json(user);
      });
    }

    return res.status(401).json(undefined);
  })(req, res, next);
});

sessionRouter.get("/current", async (req, res) => {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    res.status(401).json(undefined);
  }
});

sessionRouter.put("/current", async (req, res) => {
  // Check if a user is signed in
  if (!req.user) {
    return res.status(401).json({ error: "User not signed in" });
  }

  // Update the user
  try {
    const user = await User.query().findById(req.user.id);
    if (user) {
      const updatedUser = await user.$query().patchAndFetch(req.body);
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

sessionRouter.delete("/", (req, res) => {
  req.logout();
  res.status(200).json({ message: "User signed out" });
});

export default sessionRouter;
