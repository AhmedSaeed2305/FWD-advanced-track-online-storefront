import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { User, UserStore } from "./models/users";
import { Order, OrderStore } from "./models/orders";
import productsRoutes from "./handlers/products";
import usersRoutes from "./handlers/users";

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(bodyParser.json());

//CORS ENABLED
app.use(cors());

// server methods
app.get("/", function (req: express.Request, res: express.Response) {
  res.send("Hello World!");
});

// Handlers method
productsRoutes(app);
usersRoutes(app);
app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

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
