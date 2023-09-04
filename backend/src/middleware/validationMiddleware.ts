import { Response, NextFunction } from "express";
import CustomRequest from "../../types/CustomRequest";
import { registerSchema } from "../validations/userValidation";
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
