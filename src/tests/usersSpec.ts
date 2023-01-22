import { User, UserStore } from "../models/users";
import app from "../server";
import supertest from "supertest";

// asigning supertest to the app
const request = supertest(app);

const userStore = new UserStore();

// Create user before run tests
beforeAll(async () => {
  const result = await userStore.create({
    firstName: "test1",
    lastName: "test1",
    password: "password123",
  } as unknown as User);
});
// model test suites
describe("Users model", () => {
  it("should have an index method", () => {
    expect(userStore.index).toBeDefined();
  });
  it("should have a show method", () => {
    expect(userStore.show).toBeDefined();
  });
  it("should have a create method", () => {
    expect(userStore.create).toBeDefined();
  });

  // show all users test
  it("index method should return a list of users", async () => {
    const result = await userStore.index();
    expect(result).toEqual(jasmine.any(Array));
  });
  // show one user test
  it("show method should return one user", async () => {
    const result = await userStore.show("1");
    expect(result).toEqual(jasmine.any(Object));
  });
});

// the endpoint test suites for users handler
describe("Test endpoints responses", () => {
  it("gets all users endpoint", async () => {
    const response = await request.get("/users");
    expect(response.status).toBe(200);
  });

  it("gets one user endpoint", async () => {
    const response = await request.get("/user?id=1");
    expect(response.status).toBe(200);
  });
  // should respond with 400 because the request body aren't provided
  it("creates new user end point", async () => {
    const response = await request.post("/new-user");
    expect(response.status).toBe(400);
  });
});
