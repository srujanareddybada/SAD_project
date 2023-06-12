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

/**
 * @swagger
 * /api/login/refresh:
 *   post:
 *     tags:
 *      - Auth
 *     summary: Refresh session token
 *     description: Exchange a valid refresh token for a new session token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *             required:
 *               - refreshToken
 *     responses:
 *       200:
 *         description: New session token generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sessionToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *       403:
 *         description: Invalid refresh token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

router.post("/refresh", controller.refreshAsync);

module.exports = router;
