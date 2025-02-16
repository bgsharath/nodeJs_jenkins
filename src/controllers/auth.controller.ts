import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import logger from "../config/logger";

export const AuthController = {
  signup: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await AuthService.signup(req.body);
      logger.info("User created successfully")
      res.status(201).json({
        message: res.__("user_created_success"),
        data: user,
        success: true,
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err:any) {
      next(err)
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const { token, user } = await AuthService.login(email, password);
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 3600000, // 1 hour
      });
      logger.info("User login successfully")
      res.status(200).json({
        message: res.__("login_success"),
        data: user,
        success: true,
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      next(err)
    }
  },

  logout: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.clearCookie("token", {
        httpOnly: true,
      });
      logger.info("User logout successfully")
      res.status(200).json({ message: "Logout successful", success: true });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err:any) { 
      next(err)
    }
  }
};
