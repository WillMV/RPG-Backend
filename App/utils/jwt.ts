import { JwtPayload, sign, verify } from "jsonwebtoken";
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
