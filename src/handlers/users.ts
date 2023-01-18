import express from "express";
import { User, UserStore } from "./../models/users";

// instantiate the users object
const usersStore = new UserStore();

// index method
const index = async (_req: express.Request, res: express.Response) => {
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
    const user = await usersStore.create(req.body);
    console.log(user);
    res.json(user);
  } catch (err) {
    console.log(err);
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
