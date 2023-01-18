import express from "express";
import { Order, OrderStore } from "./../models/orders";

// instantiate orders object
const ordersStore = new OrderStore();

// checkStatus helper function
const checkSatatus = (order: Order) => {
  if (order.status === false) {
    return (order.checkStatus = "Active");
  } else {
    return (order.checkStatus = "Complete");
  }
};

// index method
const index = async (_req: express.Request, res: express.Response) => {
  try {
    const orders = await ordersStore.index();
    orders.forEach((order: Order) => checkSatatus(order));
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

// show method
const show = async (req: express.Request, res: express.Response) => {
  try {
    const order = await ordersStore.show(req.query.id as string);
    checkSatatus(order);
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

// create method
const create = async (req: express.Request, res: express.Response) => {
  try {
    const order = await ordersStore.create(req.body);
    checkSatatus(order);
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

// routes handlers methods

const ordersRoutes = (app: express.Application) => {
  app.get("/orders", index);
  app.get("/order/user-id", show);
  app.post("/new-order", create);
};

export default ordersRoutes;
