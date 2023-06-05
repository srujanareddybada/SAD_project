var express = require("express");
var router = express.Router();

var controller = require("../controllers/userBetsController");
var express = require("express");
var router = express.Router();

//controller functions are imported
const {
  createUser
} = require('../controllers/userController')

router.post('/', createUser)



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
 *       201:
 *         description: resource created!
 */
router.post("/:id/bets", controller.createBetAsync);

module.exports = router;
