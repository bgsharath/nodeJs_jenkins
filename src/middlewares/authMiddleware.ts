import { Request, Response, NextFunction } from "express";

import { verifyToken } from "../utils/authUtils";
import { UserRepository } from "../repositories/user.repository";

declare module "express-serve-static-core" {
  interface Request {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user?: any;
  }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { token } = req.cookies;
    if (!token) {
      res.status(401).send("Please Login!");
      return
    }

    const decodedObj = await verifyToken(token);

    if (!decodedObj) {
      throw new Error("Invalid token");
    }

    const { id } = decodedObj;

    const user = await UserRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("ERROR: " + error);
  }
};
