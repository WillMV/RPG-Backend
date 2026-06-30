import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";

const middlewares = {
  async validateToken(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.header("Authorization");
      if (!token) return res.status(401).send("Unauthorized");
      const decoded = verifyToken(token);
      if (!decoded) return res.status(401).send("Unauthorized");
      res.locals.user = decoded;

      next();
    } catch (error) {
      res.status(401).send("Unauthorized");
    }
  },
};

export default middlewares;
