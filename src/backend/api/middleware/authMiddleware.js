const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware function to verify Jet token
const authAdminMiddleware = (req, res, next) => {
  // Get the token from the request headers, query parameters, or cookies
  try {
    const authorizationHeader = req.headers.authorization;
    console.log(authorizationHeader);

    if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
      // Extract the token from the authorization header
      const token = authorizationHeader.substring(7);

      if (!token) {
        return res
          .status(401)
          .json({ message: "No token found! Provide a valid token" });
      }

      // Verify the token using your secret key
      const decoded = jwt.verify(token, process.env.SECRET);

      // Add the decoded payload to the request object
      req.user = decoded;
      console.log(decoded);

      if (decoded.admin) {
        next();
      } else {
        return res
          .status(403)
          .json({ message: "You are not allowed to access this resource!" });
      }
    } else {
      return res
        .status(401)
        .json({ message: "No token found! Provide a valid token" });
    }
  } catch (err) {
    console.log(err);

    return res.status(401).json({ message: "Token Invalid!" });
  }
};

// Middleware function to verify Jet token
const authMiddleware = (req, res, next) => {
  // Get the token from the request headers, query parameters, or cookies
  try {
    const headers = req.headers;
    console.log(headers);

    const authorizationHeader = req.headers.authorization;
    console.log(authorizationHeader);

    if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
      // Extract the token from the authorization header
      const token = authorizationHeader.substring(7);

      if (!token) {
        return res
          .status(401)
          .json({ message: "No token found! Provide a valid token" });
      }

      // Verify the token using your secret key
      const decoded = jwt.verify(token, process.env.SECRET);

      // Add the decoded payload to the request object
      req.user = decoded;
      console.log(decoded);

      next();
    } else {
      return res
        .status(401)
        .json({ message: "No token found! Provide a valid token" });
    }
  } catch (err) {
    console.log(err);

    return res.status(401).json({ message: "Token Invalid!" });
  }
};

module.exports = { authMiddleware, authAdminMiddleware };
