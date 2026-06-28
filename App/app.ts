import express from "express";
import Routes from "./Routes";

const app = express();

app.get("/", (_, res) => {
  res.send();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(Routes);

export default app;
