var services = require("../services/loginService");

const loginAsync = async (req, res, next) => {
  try {
    var cred = req.body;
    var user = await services.loginAsync(cred);
    console.log(user);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(400).json({ message: "Email or Password did not match!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Could not create a new user bet(s)",
    });
  }
};

const loginController = {
  loginAsync,
};

module.exports = loginController;
