const setupSocket = function (io) {
  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("chat message", (msg) => {
      console.log("Received message:", msg);
      // Handle the message and emit events as needed
      io.emit("chat message", msg);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};

module.exports = setupSocket;
