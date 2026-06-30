import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
const { sign, verify } = jwt;
const secretKey = process.env.SECRET_KEY || "default_secret_key";

export const generateToken = (payload: object): string =>
  sign(payload, secretKey, { expiresIn: "1d", algorithm: "HS256" });

export const verifyToken = (token: string): object | null => {
  try {
    return verify(token, secretKey) as JwtPayload;
  } catch (error) {
    return null;
  }
};
