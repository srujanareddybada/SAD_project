var services = require("../services/userBetsService");

const getAllUserBetsAsync = async (req, res, next) => {
  const userId = req.params.id;
  try {
    var result = await services.allUserBetsAsync(userId);
    console.log(result);
    res.status(200).json(result);
  } catch {
    res.status(500).json({
      error: "Could not get the user bets",
    });
  }
};

const createBetAsync = async (req, res, next) => {
  const userId = req.params.id;
  console.log("UserId:" + userId);
  const betlist = req.body;
  console.log(betlist);
  if (Array.isArray(betlist)) {
    try {
      var result = await services.createBetAsync(userId, betlist);
      res.status(201).json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: "Could not create a new user bet(s)",
      });
    }
  } else {
    res.status(400).json({ error: "provided list of bets is not an array" });
  }
};

const userBetsController = {
  getAllUserBetsAsync,
  createBetAsync,
};

module.exports = userBetsController;
