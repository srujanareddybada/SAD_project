var express = require("express");
var router = express.Router();
const provisoner = require("../../Upcomming_Matches_10_Days");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.redirect(301, "/docs");
});

/**
 * @swagger
 * /api/matches:
 *   put:
 *     tags:
 *      - Matches
 *     summary: Get all betting events
 *     description: Retrieve a list of all events
 *     responses:
 *       200:
 *         description: A list of bets
 *
 */

router.put("/api/matches", async function (req, res, next) {
  mongodb = req.app.get("mongodb");
  await provisoner.UpcomingMatches10Days(mongodb);
  res.status(200).json("Success");
});

/**
 * @swagger
 * /api/healthcheck:
 *   get:
 *     tags:
 *      - Healthcheck
 *     summary:
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: A list of bets
 */
router.get("/api/healthcheck", function (req, res, next) {
  res.sendStatus(200);
});

module.exports = router;
