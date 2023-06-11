var express = require("express");
var router = express.Router();
var controller = require("../controllers/userBetsController");

//controller functions are imported
const {
  createUser,
  grantOauth2UserAccess,
  updateUserBalanceAsync,
} = require("../controllers/userController");
const { updateBlockUserAsync } = require("../controllers/adminUserController");

router.post("/", createUser);

//create user if registered udsing Oauth2 login
router.post("/oauth2login", grantOauth2UserAccess);

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
 *    tags:
 *      - User Bets
 */
router.get(`/:id/bets`, controller.getAllUserBetsAsync);

/**
 * @swagger
 * /api/user/{id}/bets:
 *   post:
 *     tags:
 *      - User Bets
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
 *            schema:
 *              $ref: '#/components/schemas/UserBets'
 *     summary: Get all betting associated with the user
 *     description: Retrieve betting associated with the user
 *     responses:
 *       201:
 *         description: resource created!
 */

router.post("/:id/bets", controller.createBetAsync);

/**
 * @swagger
 * /api/user/{id}/balance:
 *   patch:
 *     tags:
 *      - User
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
 *            schema:
 *              $ref: '#/components/schemas/BetBalance'
 *     summary: update user balance
 *     description: update balance
 *     responses:
 *       200:
 *         description: balance updated!
 */

router.patch("/:id/balance", updateUserBalanceAsync);

/**
 * @swagger
 * /api/user/{id}/block:
 *   patch:
 *     tags:
 *      - Admin
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
 *            schema:
 *              $ref: '#/components/schemas/UserBlocked'
 *     summary: update block status
 *     description: update block status
 *     responses:
 *       200:
 *         description: block status updated!
 */

router.patch("/:id/block", updateBlockUserAsync);

module.exports = router;
