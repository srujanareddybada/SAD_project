const request = require("supertest");
const express = require("express");

const app = express();
const router = require("./index"); // Replace with the path to your router file

// Mock the MongoDB object
const mockedMongoDB = {
  collection: jest.fn().mockReturnThis(),
  insertMany: jest.fn(),
};

// Mount the router on the app
app.use((req, res, next) => {
  req.app.set("mongodb", mockedMongoDB);
  next();
});
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
    const response = await request(app).put("/api/matches");
    expect(response.status).toBe(200);
    expect(response.body).toBe("Success");
    expect(mockedMongoDB.collection).toHaveBeenCalledWith("upcomingmatches");
    expect(mockedMongoDB.insertMany).toHaveBeenCalled();
  });
});

describe("GET /api/healthcheck", () => {
  it("should respond with 200 status code", async () => {
    const response = await request(app).get("/api/healthcheck");
    expect(response.status).toBe(200);
  });
});
