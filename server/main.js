import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import {createServer} from 'node:http';
import cookieParser from 'cookie-parser';
import MongoDb from './config/MongoDB.js';
import { login, register } from './controllers/AuthController.js';
import AuthRouter from './routes/AuthRoutes.js';
import ProtectedRouter from './routes/ProtectedRoutes.js';
import { Server } from 'socket.io';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import UserModel from './models/UserModel.js';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Your frontend URL
    methods: ['GET', 'POST'],
    credentials: true
  }
});

const _dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend's URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTION'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(cookieParser());

MongoDb();

app.get("/chat", function (req, res) {
  return res.sendFile(join(_dirname, "socket.html"));
});

io.on("connection",async function (socket) {
  console.log("User Connected");
  const users = await UserModel.find({});
  io.emit('users', users);
  socket.on("chat", function (msg) {
    console.log(`message: ${msg}`);
    io.emit("chat", msg);
  });
});

app.use('/api/auth', AuthRouter);
app.use('/api/user', ProtectedRouter);


server.listen(8080, ()=>{
    console.log(`Server started on port 8080`);
});