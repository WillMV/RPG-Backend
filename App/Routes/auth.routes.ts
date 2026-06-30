import { Router } from "express";
import authController from "../Controller/authController";
import middlewares from "../Middlewares";

const authRoutes = Router();
// Post
authRoutes.post("/signup", authController.signup);
authRoutes.post("/validate-email", authController.validateEmail);
authRoutes.post("/signin", authController.signin);
authRoutes.post(
  "/request-password-code",
  authController.requestResetPasswordCode,
);

//Patch
authRoutes.patch("/reset-password", authController.resetPassword);
authRoutes.patch(
  "/update-password",
  middlewares.validateToken,
  authController.updatePassword,
);

export default authRoutes;
