import { Order, OrderStore } from "../models/orders";
import app from "../server";
import supertest from "supertest";

// asigning supertest to the app
const request = supertest(app);

const ordersStore = new OrderStore();

describe("Users model", () => {
  it("should have an index method", () => {
    expect(ordersStore.show).toBeDefined();
  });
  //   it("should create new order", async () => {
  //     const result = await ordersStore.create({
  //       quantity: 10,
  //       status: true,
  //       productId: 1,
  //       userId: 1,
  //     } as unknown as Order);

  //     expect(result).toEqual({
  //       quantity: 10,
  //       status: true,
  //       productId: 1,
  //       userId: 1,
  //     } as unknown as Order);
  //   });
});

// the endpoint test suite for orders model
// needs the JWT token to return status 200 it should return status 401 without token
describe("Test endpoint responses", () => {
  it("gets orders endpoint", async () => {
    const response = await request.get("/orders");
    expect(response.status).toBe(401);
  });
});
