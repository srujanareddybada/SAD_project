var express = require("express");
var router = express.Router();
const live = require("../../config/liveSimulatorToggle");
const liveSimulator = require("../../backgroundServices/backgroundServiceHelper");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.redirect(301, "/docs");
});

/**
 * @swagger
 * /api/live:
 *   put:
 *     tags:
 *      - Live
 *     description: Toggles live simulator on and off
 *     responses:
 *       200:
 *         description: Toggles the simulator successfully
 */

router.put("/", async function (req, res, next) {
  live.isLive = !live.isLive;
  if (live.isLive) {
    liveSimulator.startBackgroundService();
  } else {
    liveSimulator.stopBackgroundService();
  }
  res.status(200).json(`Simulator set to ${live.isLive}`);
});

module.exports = router;
