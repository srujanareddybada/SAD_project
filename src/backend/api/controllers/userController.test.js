const { createUser } = require("./userController"); 
const User = require("../models/userModel"); 

jest.mock("../models/userModel", () => ({
  findOne: jest.fn(),
  create: jest.fn(),
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(() => "mocked-token"),
}));

describe("createUser", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {
        id: "1",
        username: "testuser",
        password: "password",
        email: "test@example.com",
        fullname: "Test User",
        dob: "2000-01-01",
        balance: 0,
      },
    };

    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should create a new user and return a JWT token", async () => {
    User.findOne.mockResolvedValueOnce(null);
    User.create.mockResolvedValueOnce({
      _id: "user-id",
      email: "test@example.com",
    });

    await createUser(req, res);

    expect(User.findOne).toHaveBeenCalledTimes(1);
    expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });

    expect(User.create).toHaveBeenCalledTimes(1);
    expect(User.create).toHaveBeenCalledWith({
      username: "testuser",
      password: "password",
      email: "test@example.com",
      fullname: "Test User",
      dob: "2000-01-01",
      balance: 0,
    });
    

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ token: "mocked-token" });
  });

  test("should return an error if the user already exists", async () => {
    User.findOne.mockResolvedValueOnce({ email: "test@example.com" });

    await createUser(req, res);

    expect(User.findOne).toHaveBeenCalledTimes(1);
    expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });

    expect(User.create).not.toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: "User already exists",
    });
    
  });

  test("should return an error if an exception is thrown", async () => {
    User.findOne.mockRejectedValueOnce(new Error("Database error"));

    await createUser(req, res);

    expect(User.findOne).toHaveBeenCalledTimes(1);
    expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });

    expect(User.create).not.toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Database error",
    });
  });
});
