var services = require("../services/loginService");
const jwt = require("jsonwebtoken");

const loginAsync = async (req, res, next) => {
  try {
    var cred = req.body;
    var user = await services.loginAsync(cred);
    console.log(user);
    if (user) {
      // Generate refresh token
      const refreshToken = jwt.sign({ userId: user._id }, process.env.SECRET, {
        expiresIn: "3d",
      });

      // Generate session token
      const sessionToken = jwt.sign(
        { userId: user._id, admin: user.admin },
        process.env.SECRET,
        {
          expiresIn: "15m",
        }
      );
      res.status(200).json({
        user: user,
        refreshToken: refreshToken,
        sessionToken: sessionToken,
      });
    } else {
      res.status(400).json({ message: "Email or Password did not match!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Something went wrong! Please try again after some time",
    });
  }
};

const refreshAsync = async (req, res, next) => {
  const { refreshToken } = req.body;

  jwt.verify(refreshToken, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid refresh token." });
    }

    const userId = decoded.userId;
    const admin = decoded.admin;

    const user = { userId: userId, admin: admin };
    // Generate a new session token
    const sessionToken = jwt.sign(user, process.env.SECRET, {
      expiresIn: "15m",
    });

    // Generate a new refresh token
    const refreshToken = jwt.sign(user, process.env.SECRET, {
      expiresIn: "15m",
    });

    // Return the new session token
    res.json({ sessionToken: sessionToken, refreshToken: refreshToken });
  });
};

const loginController = {
  loginAsync,
  refreshAsync,
};

module.exports = loginController;
