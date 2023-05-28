var controller = require("../controllers/betsController");
var express = require("express");
var router = express.Router();
/**
 * @swagger
 * /api/bets:
 *   get:
 *     summary: Get all betting events
 *     description: Retrieve a list of all events
 *     responses:
 *       200:
 *         description: A list of bets
 */
router.get("/", controller.getAllBets);

module.exports = router;
