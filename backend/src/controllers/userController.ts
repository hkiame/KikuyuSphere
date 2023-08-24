import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

export const getUser = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({ message: "Getting users from controller" });
});
