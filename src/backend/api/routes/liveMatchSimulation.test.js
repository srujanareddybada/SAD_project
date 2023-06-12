const request = require("supertest");
const express = require("express");
// const liveSimulatorToggle = require("../../config/liveSimulatorToggle");
// const liveSimulator = require("../../backgroundServices/backgroundServiceHelper");

const app = express();
app.use("/", require("./liveMatchSimulation")); 

describe("GET /", () => {
  it("should redirect to /docs with a 301 status code", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(301);
    expect(response.headers.location).toBe("/docs");
  });
});

