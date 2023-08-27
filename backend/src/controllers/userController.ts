import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import CustomRequest from "../../types/CustomRequest";

export const profile = expressAsyncHandler(
  async (req: CustomRequest, res: Response) => {
    res.status(200).json(req.user);
  }
);
