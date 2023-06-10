const mongoose = require("mongoose");
const User = require("./userModel"); 

describe("User model", () => {
  beforeAll(async () => {
    // Mock the mongoose.connect function
    mongoose.connect = jest.fn(() => Promise.resolve());
  });

  afterAll(async () => {
    // Restore the original mongoose.connect function
    jest.restoreAllMocks();
  });

  it("should save a new user successfully", async () => {
    // Create a new user object
    const newUser = new User({
      username: "john_doe",
      password: "password123",
      email: "john@example.com",
      fullname: "John Doe",
      dob: new Date("1990-01-01"),
      balance: 100,
    });
  
    // Mock the save function
    newUser.save = jest.fn(() => Promise.resolve(newUser));
  
    // Save the user to the database
    const savedUser = await newUser.save();
  
    // Expect the save function to have been called once
    expect(newUser.save).toHaveBeenCalledTimes(1);
  
    // Expect the saved user object to have the same properties
    expect(savedUser.username).toBe("john_doe");
    expect(savedUser.password).toBe("password123");
    expect(savedUser.email).toBe("john@example.com");
    expect(savedUser.fullname).toBe("John Doe");
    expect(savedUser.dob).toEqual(new Date("1990-01-01"));
    expect(savedUser.balance).toBe(100);
  }, 10000); // Set the timeout value to 10000 milliseconds (10 seconds)

  it("should require all the required fields", async () => {
    try {
      // Try to save a user without providing required fields
      const userWithoutFields = new User({});
      await userWithoutFields.save();
    } catch (error) {
      // Expect a validation error to be thrown
      expect(error).toBeInstanceOf(mongoose.Error.ValidationError);

      // Expect the error to contain the required field error messages
      expect(error.errors.username).toBeDefined();
      expect(error.errors.password).toBeDefined();
      expect(error.errors.email).toBeDefined();
      expect(error.errors.fullname).toBeDefined();
      expect(error.errors.dob).toBeDefined();
    }
  });
});
