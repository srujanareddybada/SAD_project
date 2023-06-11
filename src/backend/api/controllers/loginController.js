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
      const sessionToken = jwt.sign({ userId: user._id }, process.env.SECRET, {
        expiresIn: "15m",
      });
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

const loginController = {
  loginAsync,
};

module.exports = loginController;
