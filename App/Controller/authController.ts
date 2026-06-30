import { Request, Response } from "express";
import authService from "../service/auth.service";
const authController = {
  async signin(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const data = await authService.login(email, password);

      res.send(data).status(201);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async signup(req: Request, res: Response) {
    try {
      const data = req.body;
      await authService.register(data);
      res
        .send(
          "account is already created and validate code sended to your email.",
        )
        .status(200);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async validateEmail(req: Request, res: Response) {
    try {
      const { email, code } = req.body;
      const data = await authService.validateEmail(email, code);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  async updatePassword(req: Request, res: Response) {
    try {
      const { oldPassword, newPassword, email } = req.body;
      const data = await authService.updatePassword({
        userEmail: email,
        newPassword,
        oldPassword,
      });
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  async requestResetPasswordCode(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const data = await authService.requestResetPasswordCode(email);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  async resetPassword(req: Request, res: Response) {
    try {
      const { email, code, newPassword } = req.body;
      const data = await authService.resetPassword({
        code,
        newPassword,
        userEmail: email,
      });
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};

export default authController;
