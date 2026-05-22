import express from "express";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);

const _dirname = dirname(fileURLToPath(import.meta.url));

app.get("/chat", function (req, res) {
  return res.sendFile(join(_dirname, "socket.html"));
});

io.on("connection", function (socket) {
  console.log("User Connected");
  socket.on("chat", function (msg) {
    console.log(`message: ${msg}`);
    io.emit("chat", msg);
  });
});

server.listen(8081, function () {
  console.log(`Server Running On 8081`);
});
