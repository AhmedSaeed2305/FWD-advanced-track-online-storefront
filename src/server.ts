import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import productsRoutes from "./handlers/products";
import usersRoutes from "./handlers/users";
import ordersRoutes from "./handlers/orders";

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(bodyParser.json());

//CORS ENABLED
app.use(cors());

// server main route function
app.get("/", function (req: express.Request, res: express.Response) {
  res.send("Hello, This Ahmed's API for Online StoreFront project");
});

// Handlers method
productsRoutes(app);
usersRoutes(app);
ordersRoutes(app);

// server listen function
app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
