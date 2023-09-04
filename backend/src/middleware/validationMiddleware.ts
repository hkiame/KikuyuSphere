import { Response, NextFunction } from "express";
import CustomRequest from "../../types/CustomRequest";
import { loginSchema, registerSchema } from "../validations/userValidation";
import expressAsyncHandler from "express-async-handler";

export const validateRegistration = expressAsyncHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      await registerSchema.validate(req.body);

      next();
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
);

export const validateLogin = expressAsyncHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      await loginSchema.validate(req.body);

      next();
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
);
