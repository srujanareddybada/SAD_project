const { spawn } = require("child_process");

let backgroundServiceProcess = null;

function startBackgroundService() {
  if (backgroundServiceProcess) {
    console.log("Background service is already running.");
    return;
  }

  backgroundServiceProcess = spawn("node", [
    "backgroundServices/liveSimulatorBackgroundService.js",
  ]);

  backgroundServiceProcess.stdout.on("data", (data) => {
    console.log(`Background Service Output: ${data}`);
  });

  backgroundServiceProcess.stderr.on("data", (data) => {
    console.error(`Background Service Error: ${data}`);
  });

  backgroundServiceProcess.on("close", (code) => {
    console.log(`Background Service exited with code ${code}`);
    backgroundServiceProcess = null;
  });

  console.log("Background service started.");
}

function stopBackgroundService() {
  if (!backgroundServiceProcess) {
    console.log("Background service is not running.");
    return;
  }

  backgroundServiceProcess.kill();
  backgroundServiceProcess = null;

  console.log("Background service stopped.");
}

// Gracefully stop the background service when your Express server is shutting down
process.on("SIGINT", () => {
  stopBackgroundService();
  process.exit();
});

module.exports = {
  startBackgroundService,
  stopBackgroundService,
};
