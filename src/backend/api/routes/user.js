var express = require("express");
var router = express.Router();
var controller = require("../controllers/userBetsController");

//controller functions are imported
const { createUser,
          grantOauth2UserAccess,
} = require("../controllers/userController");

router.post("/", createUser);

//create user if registered udsing Oauth2 login
router.post('/oauth2login', grantOauth2UserAccess)


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
 *              $ref: '#/components/schemas/UserBet'
 *     summary: Get all betting associated with the user
 *     description: Retrieve betting associated with the user
 *     responses:
 *       201:
 *         description: resource created!
 */

router.post("/:id/bets", controller.createBetAsync);

module.exports = router;
