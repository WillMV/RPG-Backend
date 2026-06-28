import * as socket from "socket.io";
import registry from "./Events";
import { Server } from "http";

let io: socket.Server;

export function getIO() {
  if (!io) {
    throw new Error("Socket.io não inicializado");
  }
  return io;
}

export function initSocket(httpServer: Server) {
  io = new socket.Server(httpServer, {
    cors: {
      origin: [
        "http://localhost:5173",
        "https://rpg-alpha-two.vercel.app",
        /^https:\/\/[a-z0-9-]+\/willmvs-projects\.vercel\.app$/,
      ],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Um Cliente se conectou", socket.id); //Log online
    socket.on("disconnect", () => {
      console.log("Cliente desconctado", socket.id); //Log offline
    });
    registry({ io, socket });
  });

  return io;
}
