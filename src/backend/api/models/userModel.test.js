const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const mongoose = require("mongoose");
const UserModel = require("./userModel");
const { connectDB } = require("../../config/db_connections/mongooseDBConfig");

describe("User Model Tests", () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await UserModel.deleteMany({});
  }, 10000); // Increase timeout to 10 seconds

  it("should create a new user", async () => {
    const userData = {
      username: "john_doe",
      password: "password123",
      email: "john@example.com",
      fullname: "John Doe",
      dob: new Date("1990-01-01"),
    };

    const user = await UserModel.create(userData);

    expect(user.username).toBe(userData.username);
    expect(user.password).toBe(userData.password);
    expect(user.email).toBe(userData.email);
    expect(user.fullname).toBe(userData.fullname);
    expect(user.dob).toEqual(userData.dob);
    expect(user.balance).toBe(0);
  }, 10000); // Increase timeout to 10 seconds

  it("should require all required fields", async () => {
    try {
      await UserModel.create({});
    } catch (error) {
      expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(error.errors).toHaveProperty("username");
      expect(error.errors).toHaveProperty("password");
      expect(error.errors).toHaveProperty("email");
      expect(error.errors).toHaveProperty("fullname");
      expect(error.errors).toHaveProperty("dob");
    }
  }, 10000); // Increase timeout to 10 seconds

});
