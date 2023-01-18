import express from "express";
import { Product, ProductStore } from "./../models/products";

// instantiate the class object
const productStore = new ProductStore();

// index method
const index = async (_req: express.Request, res: express.Response) => {
  try {
    const products = await productStore.index();
    console.log(products);
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(400);
    res.json(err);
  }
};

// show method
const show = async (req: express.Request, res: express.Response) => {
  try {
    const product = await productStore.show(req.query.id as string);
    console.log(product);
    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(400);
    res.json(err);
  }
};

// create method
const create = async (req: express.Request, res: express.Response) => {
  try {
    const product = await productStore.create(
      req.body.name,
      req.body.price,
      req.body.category
    );
    console.log(product);
    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(400);
    res.json(err);
  }
};

// routes handlers method
const productsRoutes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/product", show);
  app.post("/product", create);
};

export default productsRoutes;
