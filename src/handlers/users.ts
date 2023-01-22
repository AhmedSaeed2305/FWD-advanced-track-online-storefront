import express from "express";
import { User, UserStore } from "./../models/users";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();
// instantiate the users object
const usersStore = new UserStore();

// index method
const index = async (req: express.Request, res: express.Response) => {
  try {
    const users = await usersStore.index();
    res.json(users);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
// show method
const show = async (req: express.Request, res: express.Response) => {
  try {
    const user = await usersStore.show(req.query.id as string);
    res.json(user);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
// create method
const create = async (req: express.Request, res: express.Response) => {
  try {
    const newUser = await usersStore.create(req.body);
    // JWT create new token
    const token = jwt.sign(
      { user: newUser },
      process.env.TOKEN_SECRET as string
    );
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

// routes handlers method
const usersRoutes = (app: express.Application) => {
  app.get("/users", index);
  app.get("/user", show);
  app.post("/new-user", create);
};

export default usersRoutes;
