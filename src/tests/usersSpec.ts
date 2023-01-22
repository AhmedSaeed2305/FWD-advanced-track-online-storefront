import { User, UserStore } from "../models/users";
import app from "../server";
import supertest from "supertest";

// asigning supertest to the app
const request = supertest(app);

const userStore = new UserStore();
// model test suite
describe("Users model", () => {
  it("should have an index method", () => {
    expect(userStore.index).toBeDefined();
  });
  it("should have an index method", () => {
    expect(userStore.show).toBeDefined();
  });

  beforeAll(async () => {
    const result = await userStore.create({
      firstName: "test1",
      lastName: "test1",
      password: "password123",
    } as unknown as User);
    return result;
  });

  it("index method should return a list of users", async () => {
    const result = await userStore.index();
    expect(result).toEqual(jasmine.any(Array));
  });

  it("show method should return one user", async () => {
    const result = await userStore.show("1");
    expect(result).toEqual(jasmine.any(Object));
  });
});

// the endpoint test suite for users model
// needs the JWT token to return status 200 it should return status 401 without token
describe("Test endpoints responses", () => {
  it("gets the users endpoint", async () => {
    const response = await request.get("/users");
    expect(response.status).toBe(200);
  });
});
