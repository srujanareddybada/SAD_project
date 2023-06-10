var controller = require("../controllers/loginController");
var express = require("express");
var router = express.Router();
/**
 * @swagger
 * /api/login:
 *   post:
 *     tags:
 *      - Auth
 *     summary: Login based on privilages
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Successful
 *       400:
 *         description: Events cannot be retreived!
 *       403:
 *         description: Session expired!
 */
router.post("/", controller.loginAsync);

module.exports = router;
