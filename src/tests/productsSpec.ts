import { Product, ProductStore } from "../models/products";
import app from "../server";
import supertest from "supertest";

// asigning supertest to the app
const request = supertest(app);

const productStore = new ProductStore();

describe("Users model", () => {
  it("should have an index method", () => {
    expect(productStore.index).toBeDefined();
  });

  it("should show the products list", async () => {
    const result = await productStore.index();
    expect(result).toEqual([
      {
        product_id: 1,
        name: "test1",
        price: 20,
        category: "testCat",
      } as unknown as Product,
    ]);
  });

  //   it("should create new product", async () => {
  //     const result = await productStore.create("test1", "20", "testCat");
  //     expect(result).toEqual({
  //       product_id: 1,
  //       name: "test1",
  //       price: 20,
  //       category: "testCat",
  //     } as unknown as Product);
  //   });

  it("should show a product by id", async () => {
    const result = await productStore.show("1");
    expect(result).toEqual({
      product_id: 1,
      name: "test1",
      price: 20,
      category: "testCat",
    } as unknown as Product);
  });
});

// the endpoint test suite for users model

describe("Test endpoint responses", () => {
  it("gets the products endpoint", async () => {
    const response = await request.get("/products");
    expect(response.status).toBe(200);
  });
});
