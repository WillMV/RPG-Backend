import app from "./app";
import http from "http";
import { initSocket } from "./socket";

const httpServer = http.createServer(app);

const _ = initSocket(httpServer);

httpServer.listen(process.env.PORT || 3000, () => {
  console.log(`Servidor REST rodando na porta ${process.env.PORT || 3000}`);
});
