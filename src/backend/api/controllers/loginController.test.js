const jwt = require("jsonwebtoken");
const loginController = require("../controllers/loginController");
const services = require("../services/loginService");

jest.mock("jsonwebtoken");

describe("loginController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("loginAsync", () => {
    it("should return user, refreshToken, and sessionToken if credentials are valid", async () => {
      const req = {
        body: {
          email: "test@example.com",
          password: "password123",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockUser = { _id: "user_id", admin: false };
      const mockRefreshToken = "mock_refresh_token";
      const mockSessionToken = "mock_session_token";

      services.loginAsync = jest.fn().mockResolvedValue(mockUser);
      jwt.sign.mockReturnValueOnce(mockRefreshToken);
      jwt.sign.mockReturnValueOnce(mockSessionToken);

      await loginController.loginAsync(req, res);

      expect(services.loginAsync).toHaveBeenCalledWith(req.body);
      expect(jwt.sign).toHaveBeenCalledWith(
        { userId: mockUser._id },
        process.env.SECRET,
        { expiresIn: "3d" }
      );
      expect(jwt.sign).toHaveBeenCalledWith(
        { userId: mockUser._id, admin: mockUser.admin },
        process.env.SECRET,
        { expiresIn: "15m" }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        user: mockUser,
        refreshToken: mockRefreshToken,
        sessionToken: mockSessionToken,
      });
    });

    it("should return an error message if credentials are invalid", async () => {
      const req = {
        body: {
          email: "test@example.com",
          password: "password123",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      services.loginAsync = jest.fn().mockResolvedValue(null);

      await loginController.loginAsync(req, res);

      expect(services.loginAsync).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Email or Password did not match!",
      });
    });

    it("should return an error message if an exception is thrown", async () => {
      const req = {
        body: {
          email: "test@example.com",
          password: "password123",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      services.loginAsync = jest.fn().mockRejectedValue(new Error("Database connection failed"));

      await loginController.loginAsync(req, res);

      expect(services.loginAsync).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Something went wrong! Please try again after some time",
      });
    });
  });

  describe("refreshAsync", () => {
    it("should return a new session token and refresh token if the refresh token is valid", async () => {
      const req = {
        body: {
          refreshToken: "valid_refresh_token",
        },
      };
      const res = {
        json: jest.fn(),
      };

      const mockDecodedToken = {
        userId: "user_id",
        admin: true,
      };
      const mockSessionToken = "mock_session_token";
      const mockRefreshToken = "mock_refresh_token";

      jwt.verify.mockImplementation((token, secret, callback) => {
        if (token === req.body.refreshToken) {
          callback(null, mockDecodedToken);
        } else {
          callback(new Error("Invalid refresh token"));
        }
      });
      jwt.sign.mockReturnValueOnce(mockSessionToken);
      jwt.sign.mockReturnValueOnce(mockRefreshToken);

      await loginController.refreshAsync(req, res);

      expect(jwt.verify).toHaveBeenCalledWith(
        req.body.refreshToken,
        process.env.SECRET,
        expect.any(Function)
      );
      expect(jwt.sign).toHaveBeenCalledWith(
        mockDecodedToken,
        process.env.SECRET,
        { expiresIn: "15m" }
      );
      expect(jwt.sign).toHaveBeenCalledWith(
        mockDecodedToken,
        process.env.SECRET,
        { expiresIn: "15m" }
      );
      expect(res.json).toHaveBeenCalledWith({
        sessionToken: mockSessionToken,
        refreshToken: mockRefreshToken,
      });
    });

    it("should return an error message if the refresh token is invalid", async () => {
      const req = {
        body: {
          refreshToken: "invalid_refresh_token",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(new Error("Invalid refresh token"));
      });

      await loginController.refreshAsync(req, res);

      expect(jwt.verify).toHaveBeenCalledWith(
        req.body.refreshToken,
        process.env.SECRET,
        expect.any(Function)
      );
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        message: "Invalid refresh token.",
      });
    });
  });
});
