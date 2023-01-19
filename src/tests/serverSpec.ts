import app from "../server";
import supertest from "supertest";

// asigning supertest to the app
const request = supertest(app);

describe("Test main endpoint responses", () => {
  it("gets main sever endpoint", async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
  });
});
