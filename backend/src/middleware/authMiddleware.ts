import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../prisma/client";
import expressAsyncHandler from "express-async-handler";
import CustomRequest from "../../types/CustomRequest";

export const authorizeUser = expressAsyncHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    let token: string;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];

        const decode: any = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decode.userId;

        const user = await prisma.user.findUnique({
          where: {
            id: userId,
          },
          select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
            email: true,
            avatarUrl: true,
            createdAt: true,
            updatedAt: true,
            role: true,
            emailConfirmed: true,
          },
        });

        if (!user.emailConfirmed) {
          throw new Error(
            "Please check your email to confirm your email address."
          );
        }

        req.user = user;
        next();
      } catch (error) {
        res.status(401);
        throw new Error("Not authorized.");
      }
    }

    if (!token) {
      res.status(401);
      throw new Error("No token, Not authorized.");
    }
  }
);
