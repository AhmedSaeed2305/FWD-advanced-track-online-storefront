import { Order, OrderStore } from "../models/orders";
import { User, UserStore } from "../models/users";
import { Product, ProductStore } from "../models/products";
import app from "../server";
import supertest from "supertest";

// asigning supertest to the app
const request = supertest(app);

const orderStore = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();

// Create order before run tests
beforeAll(async () => {
  await userStore.create({
    firstName: "test1",
    lastName: "test1",
    password: "password123",
  } as unknown as User);
  await productStore.create("test1", "1000", "test1");
  await orderStore.create({
    quantity: 10,
    status: true,
    productId: 1,
    userId: 1,
  } as unknown as Order);
});

// model test suites
describe("orders model", () => {
  it("should have an index method", () => {
    expect(orderStore.index).toBeDefined();
  });
  it("should have a show method", () => {
    expect(orderStore.show).toBeDefined();
  });
  it("should have a create method", () => {
    expect(orderStore.show).toBeDefined();
  });
  it("should have an addProducts method", () => {
    expect(orderStore.addProducts).toBeDefined();
  });

  // Show all orders test
  it("index method should return a list of orders", async () => {
    const result = await orderStore.index("1");
    expect(result).toEqual(jasmine.any(Array));
  });
  // Show one order test
  it("show method should return one order", async () => {
    const result = await orderStore.show("1");
    expect(result).toEqual(jasmine.any(Object));
  });
});

// the endpoint test suite for orders handler

describe("Test endpoints responses", () => {
  it("gets all orders endpoint", async () => {
    const response = await request.get("/orders?id=1");
    expect(response.status).toBe(200);
  });

  it("gets one order endpoint", async () => {
    const response = await request.get("/order/user-id?id=1");
    expect(response.status).toBe(200);
  });
  it("creates new order end point", async () => {
    const response = await request.post("/new-order");
    expect(response.status).toBe(400);
  });
  it("add product end point", async () => {
    const response = await request.post("/add-products");
    expect(response.status).toBe(400);
  });
});
