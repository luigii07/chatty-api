import express from "express";
import http from "node:http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import { errorHandling } from "./middlewares/error-handling";
import { routes } from "./routes";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const CORS_ORIGINS = {
  production: "",
  development: "http://localhost:5173"
};

const app = express();

app.use(cors({
    origin: [CORS_ORIGINS.development, CORS_ORIGINS.production],
    credentials: true,
}));

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: [CORS_ORIGINS.development, CORS_ORIGINS.production],
    },
});

export const onlineUsers: Record<string, string> = {};

function getReceiverSocketId(userId: string){
    return onlineUsers[userId];
}

io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    const userId = socket.handshake.query.userId as string;
    if (userId) onlineUsers[userId] = socket.id;
    io.emit("getOnlineUsers", Object.keys(onlineUsers));

    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id);
        delete onlineUsers[userId];
        io.emit("getOnlineUsers", Object.keys(onlineUsers));
    });
});

app.use(cookieParser());

app.use(express.json());
app.use(routes);

app.use(errorHandling);

export { server, io, getReceiverSocketId };