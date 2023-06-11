var express = require("express");
var router = express.Router();
const { getAllUsersAsync } = require("../controllers/adminUserController");

/**
 * @swagger
 * /api/users:
 *   get:
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
router.get("/", getAllUsersAsync);

module.exports = router;
