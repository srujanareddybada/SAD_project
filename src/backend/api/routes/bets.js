var controller = require("../controllers/betsController");
var express = require("express");
var router = express.Router();
/**
 * @swagger
 * /api/bets:
 *   get:
 *     tags:
 *      - Matches
 *      - Bets
 *     summary: Get all betting events
 *     description: Retrieve a list of all events
 *     parameters:
 *       - in: query
 *         name: isLive
 *         schema:
 *           type: boolean
 *         description: Filter matches by Live
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         description: Filter pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         description: Filter pagination
 *     responses:
 *       200:
 *         description: A list of bets
 *       404:
 *         description: Events cannot be retreived!
 */
router.get("/", controller.getAllBets);

module.exports = router;
