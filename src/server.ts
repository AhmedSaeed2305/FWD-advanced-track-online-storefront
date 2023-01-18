import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Product, ProductStore } from "./models/products";
import { User, UserStore } from "./models/users";
import { Order, OrderStore } from "./models/orders";

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(bodyParser.json());

//CORS ENABLED
app.use(cors());

app.get("/", function (req: express.Request, res: express.Response) {
  res.send("Hello World!");
});

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

//#region Product routes
// This is the product INDEX route
app.get("/products", (_req: express.Request, res: express.Response) => {
  try {
    const productStore = new ProductStore();
    productStore.index().then((resolve) => {
      res.send(resolve);
    });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

// This is the product SHOW route
app.get("/product", (req: express.Request, res: express.Response) => {
  try {
    const productStore = new ProductStore();
    productStore.show(req.query.id as string).then((resolve) => {
      console.log(resolve);
      res.send(resolve);
    });
  } catch (err) {
    console.log(err);
    res.status(400);
    res.json(err);
  }
});

// This is the product CREATE route
app.post("/product", (req: express.Request, res: express.Response) => {
  const article = {
    title: req.body.title,
    content: req.body.content,
  };
  try {
    res.send("this is the CREATE route");
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});
//#endregion

//#region User routes
// This is the users INDEX route
app.get("/user", (_req: express.Request, res: express.Response) => {
  try {
    res.send("this is the user INDEX route");
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

// This is the users SHOW route
app.get("/user/:id", (req: express.Request, res: express.Response) => {
  try {
    res.send("this is the user SHOW route");
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

// This is the user CREATE route
app.post("/new-user", (req: express.Request, res: express.Response) => {
  const article = {
    title: req.body.title,
    content: req.body.content,
  };
  try {
    res.send("this is the new user CREATE route");
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});
//#endregion

//#region
//This the order SHOW route
app.get("/order/:userId", (req: express.Request, res: express.Response) => {
  try {
    res.send("this is the order SHOW route");
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});
//#endregion
