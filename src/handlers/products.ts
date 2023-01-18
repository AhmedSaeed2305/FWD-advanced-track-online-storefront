import express from "express";
import { Product, ProductStore } from "./../models/products";

// instantiate the products object
const productStore = new ProductStore();

// index method
const index = async (_req: express.Request, res: express.Response) => {
  try {
    const products = await productStore.index();
    res.json(products);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

// show method
const show = async (req: express.Request, res: express.Response) => {
  try {
    const product = await productStore.show(req.query.id as string);
    res.json(product);
  } catch (err) {
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
    res.json(product);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

// routes handlers method
const productsRoutes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/product", show);
  app.post("/new-product", create);
};

export default productsRoutes;
