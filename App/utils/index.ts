import { Server, Socket } from "socket.io";
import { PrismaClient } from "../../generated/prisma/client";

export interface IRegistry {
  io: Server;
  socket: Socket;
  prisma: PrismaClient;
}
