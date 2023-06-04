var express = require("express");
var router = express.Router();

var controller = require("../controllers/userBetsController");
var express = require("express");
var router = express.Router();

//controller functions are imported
const { createUser } = require("../controllers/userController");

router.put("/", createUser);

/**
 * @swagger
 * /api/user/{id}/bets:
 *   get:
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *            type : string
 *            minimum: 1
 *    summary: Get all betting associated with the user
 *    description: Retrieve betting associated with the user
 *    responses:
 *       200:
 *         description: list of user bets
 */
router.get(`/:id/bets`, controller.getAllUserBetsAsync);

/**
 * @swagger
 * /api/user/{id}/bets:
 *   post:
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           minimum: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             UserBet:
 *              type: object
 *              properties:
 *                betAmount:
 *                  type: string
 *                  description: The amount of the bet
 *                successBetReturnAmount:
 *                  type: string
 *                  description: The return amount for a successful bet
 *                betEventId:
 *                  type: string
 *                  description: The events associated with the bet
 *                createdAt:
 *                  type: string
 *                  format: date-time
 *                  description: The timestamp of when the user bet was created
 *                updatedAt:
 *                  type: string
 *                  format: date-time
 *                  description: The timestamp of when the user bet was last updated
 *              required:
 *                - id
 *                - betAmount
 *                - successBetReturnAmount
 *                - betEventId
 *                - createdAt
 *                - updatedAt
 *     summary: Get all betting associated with the user
 *     description: Retrieve betting associated with the user
 *     responses:
 *       201:
 *         description: resource created!
 */

router.post("/:id/bets", controller.createBetAsync);

module.exports = router;
