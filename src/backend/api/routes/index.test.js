const request = require("supertest");
const express = require("express");

const app = express();
const router = require("./index"); // Replace with the path to your router file

// Mount the router on the app
app.use(router);

describe("GET /", () => {
  it("should redirect to '/docs' with a 301 status code", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(301);
    expect(response.headers.location).toBe("/docs");
  });
});

describe("PUT /api/matches", () => {
  it("should respond with 200 status code and 'Success' message", async () => {
    // You may need to mock or provide a dummy `mongodb` object for testing
    const mockedMongoDB = {};

    const response = await request(app).put("/api/matches").set("mongodb", mockedMongoDB);
    expect(response.status).toBe(200);
    expect(response.body).toBe("Success");
  });
});

describe("GET /api/healthcheck", () => {
  it("should respond with 200 status code", async () => {
    const response = await request(app).get("/api/healthcheck");
    expect(response.status).toBe(200);
  });
});
