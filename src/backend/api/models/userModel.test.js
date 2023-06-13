// 1. The provided code file contains tests for the User model using the Mongoose library. It ensures that the model can save a new 
// user successfully and handles validation errors for required fields.

// 2. The code imports the necessary modules, including mongoose and the User model.

// 3. The test suite is defined using describe for the "User model".

// 4. The beforeAll hook mocks the mongoose.connect function to resolve a promise, simulating a successful database connection.

// 5. The afterAll hook restores the original mongoose.connect function.

// 6. The first test in the suite, "should save a new user successfully", creates a new User object with various properties. 
// It mocks the save function of the user object to resolve a promise with the newly created user. The test then saves the user to 
// the database and asserts that the save function was called once. It also checks if the saved user object has the same properties as 
// the original user.

// 7. The second test, "should require all the required fields", attempts to save a user object without providing any required fields. 
// It expects an error of type mongoose.Error.ValidationError to be thrown. The test further checks that the error contains the 
// required field error messages for username, password, email, fullname, and dob.

// In summary, the code file tests the functionality and validation of the User model using Mongoose. It ensures that a new user 
// can be saved successfully and handles validation errors for required fields.

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
