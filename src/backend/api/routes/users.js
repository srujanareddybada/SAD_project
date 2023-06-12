var express = require("express");
var router = express.Router();
const { getAllUsersAsync } = require("../controllers/adminUserController");
var { authAdminMiddleware } = require("../middleware/authMiddleware");

/**
 * @swagger
 * /api/users:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     tags:
 *      - Admin
 *      - Users
 *     summary: Get all users for admin
 *     responses:
 *       200:
 *         description: successfully fetched users
 *       404:
 *         description: Users not found!
 */
router.get("/", authAdminMiddleware, getAllUsersAsync);

module.exports = router;
