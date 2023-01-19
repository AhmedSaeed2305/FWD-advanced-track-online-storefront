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

  // it("should create a user", async () => {
  //   const result = await userStore.create({
  //     firstName: "test1",
  //     lastName: "test1",
  //     password: "password123",
  //   } as unknown as User);
  //   expect;
  // });

  it("index method should return a list of users", async () => {
    const result = await userStore.index();
    expect(result).toEqual([
      {
        user_id: 1,
        first_name: "test1",
        last_name: "test1",
        password:
          "$2b$10$VAJJXpzSSHGTJSrvAejfrue06Fu8Dt/Q5tSmL.8uoHrikhB0MolHy",
      } as unknown as User,
    ]);
  });
});

// the endpoint test suite for users model
// needs the JWT token to return status 200 it should return status 401 without token
describe("Test endpoints responses", () => {
  it("gets the users endpoint", async () => {
    const response = await request.get("/users");
    expect(response.status).toBe(401);
  });
});
