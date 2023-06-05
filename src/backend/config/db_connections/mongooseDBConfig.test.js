const mongoose = require("mongoose");
const { connectDB } = require("../db_connections/mongooseDBConfig");
// const dotenv = require("dotenv-flow").config();

// Mocking the mongoose.connect function
mongoose.connect = jest.fn();

// Mocking the console.log function
console.log = jest.fn();

describe("connectDB", () => {
  it("should connect to MongoDB Atlas via mongoose", async () => {
    await connectDB();

    // Verifying if mongoose.connect was called with the correct connection string
    expect(mongoose.connect).toHaveBeenCalledWith(
      `mongodb+srv://${process.env.MONGOCLOUD_USERNAME}:${process.env.MONGOCLOUD_PASSWORD}@${process.env.MONGOCLOUD_CLUSTERNAME}/${process.env.MONGOCLOUD_SPORTS_DATA_DATABASE}?retryWrites=true&w=majority`
    );

    // Verifying if console.log was called with the expected message
    expect(console.log).toHaveBeenCalledWith("Connected to MongoDB Atlas via mongoose");
  });

  it("should handle connection errors", async () => {
    const errorMessage = "Connection failed";

    // Mocking a rejected promise to simulate a connection error
    mongoose.connect.mockRejectedValue(new Error(errorMessage));

    await connectDB();

    // Verifying if mongoose.connect was called with the correct connection string
    expect(mongoose.connect).toHaveBeenCalledWith(
      `mongodb+srv://${process.env.MONGOCLOUD_USERNAME}:${process.env.MONGOCLOUD_PASSWORD}@${process.env.MONGOCLOUD_CLUSTERNAME}/${process.env.MONGOCLOUD_SPORTS_DATA_DATABASE}?retryWrites=true&w=majority`
    );

    // Verifying if console.log was called with the expected error message
    expect(console.log).toHaveBeenCalledWith(new Error(errorMessage));
  });
});
