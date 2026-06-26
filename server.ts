import express from "express";
import http from "http";
import * as socket from "socket.io";
import registry from "./App/Events/index.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client.js";

const app = express();
const httpServer = http.createServer(app);
const io = new socket.Server(httpServer, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://rpg-alpha-two.vercel.app",
      /^https:\/\/[a-z0-9-]+\.vercel\.app$/,
    ], // ou use um array se quiser permitir múltiplas origens
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const adapter = new PrismaPg({ connectionString: process.env["DATABASE_URL"] });
const prisma = new PrismaClient({ adapter });

io.on("connection", (socket) => {
  console.log("Um Cliente se conectou", socket.id); //Log online
  socket.on("disconnect", () => {
    console.log("Cliente desconctado", socket.id); //Log offline
  });
  registry({ io, socket, prisma });
});

httpServer.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
