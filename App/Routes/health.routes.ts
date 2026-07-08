import { Router } from "express";
import prisma from "../prisma";

const healthRoutes = Router();

healthRoutes.get("/health/supabase", async (_, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).send("ok");
  } catch (error) {
    console.error(error);
    res.status(500).send("unavailable");
  }
});

export default healthRoutes;
