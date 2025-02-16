import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export const UserController = {
  view: async (req: Request, res: Response) => {
    try {
      const user = req.user
      res.status(200).json({
        message: "User fetched successfully",
        data: user,
        success: true,
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err:any) {
      res.status(400).json({ message: err.message, success: false });
    }
  },

  edit: async (req: Request, res: Response) => {
    try {
      const loggedInUser = req.user
      Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
      await UserService.updateUser(String(loggedInUser.id), loggedInUser);
      res.status(200).json({
        message: `${loggedInUser.firstName}, your profile updated successfuly`,
        data: loggedInUser,
        success: true,
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      res.status(400).json({ message: err.message, success: false });
    }
  }
};
