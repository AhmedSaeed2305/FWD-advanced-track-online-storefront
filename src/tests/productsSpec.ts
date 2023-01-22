import { Product, ProductStore } from "../models/products";
import app from "../server";
import supertest from "supertest";

// asigning supertest to the app
const request = supertest(app);

const productStore = new ProductStore();

// Create product before run tests
beforeAll(async () => {
  const result = await productStore.create("test1", "1000", "test1");
});
// model test suites
describe("products model", () => {
  it("should have an index method", () => {
    expect(productStore.index).toBeDefined();
  });
  it("should have a show method", () => {
    expect(productStore.show).toBeDefined();
  });
  it("should have a create method", () => {
    expect(productStore.show).toBeDefined();
  });

  // Show all products test
  it("index method should return a list of products", async () => {
    const result = await productStore.index();
    expect(result).toEqual(jasmine.any(Array));
  });
  // Show one product test
  it("show method should return one product", async () => {
    const result = await productStore.show("1");
    expect(result).toEqual(jasmine.any(Object));
  });
});

// the endpoint test suite for products handler
describe("Test endpoints responses", () => {
  it("gets all products endpoint", async () => {
    const response = await request.get("/products");
    expect(response.status).toBe(200);
  });

  it("gets one product endpoint", async () => {
    const response = await request.get("/product?id=1");
    expect(response.status).toBe(200);
  });
  // should respond with 400 because the request body aren't provided
  it("creates new product end point", async () => {
    const response = await request.post("/new-product");
    expect(response.status).toBe(400);
  });
});
