var express = require("express");
var router = express.Router();
var controller = require("../controllers/userBetsController");
var {
  authMiddleware,
  authAdminMiddleware,
} = require("../middleware/authMiddleware");

//controller functions are imported
const {
  createUser,
  grantOauth2UserAccess,
  updateUserBalanceAsync,
  getUserAsync,
} = require("../controllers/userController");
const { updateBlockUserAsync } = require("../controllers/adminUserController");

//create registered user
router.post("/", createUser);

/**
 * @swagger
 * /api/user/{id}/bets:
 *   get:
 *    security:
 *       - BearerAuth: []
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
router.get(`/:id/bets`, authMiddleware, controller.getAllUserBetsAsync);

/**
 * @swagger
 * /api/user/{id}/bets:
 *   post:
 *     security:
 *       - BearerAuth: []
 *     tags:
 *      - Users
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

router.post("/:id/bets", authMiddleware, controller.createBetAsync);

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
 *     security:
 *       - BearerAuth: []
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

router.patch("/:id/block", authAdminMiddleware, updateBlockUserAsync);

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     tags:
 *      - User
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           minimum: 1
 *     summary: returns current user
 *     responses:
 *       200:
 *         description: fetched details from user!
 *       404:
 *         description: User not found!
 *
 */

router.get("/:id", getUserAsync);

module.exports = router;
