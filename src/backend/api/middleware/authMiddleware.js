const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware function to verify Jet token
const authMiddleware = (req, res, next) => {
  // Get the token from the request headers, query parameters, or cookies
  const token =
    req.headers["x-jet-token"] || req.query.token || req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "No token found! Provide a valid token" });
  }

  try {
    // Verify the token using your secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add the decoded payload to the request object
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Token Invalid!" });
  }
};

module.exports = authMiddleware;
