import prisma from "../prisma/client";
import { hashPassword, verifyPassword, generateToken } from "../utils/auth";
import jwt from "jsonwebtoken";
import { Response } from "express";

export const register = async (
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  password: string
) => {
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ username }, { email }],
    },
  });

  if (existingUser) {
    throw new Error("Username or email already exists.");
  }

  const hashedPassword = await hashPassword(password);
  const newUser = await prisma.user.create({
    data: {
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
    },
  });
  return newUser;
};

export const login = async (
  usernameOrEmail: string,
  password: string,
  res: Response
) => {
  const user = await prisma.user.findFirst({
    where: { OR: [{ username: usernameOrEmail }, { email: usernameOrEmail }] },
  });

  if (!user || !verifyPassword(password, user.password)) {
    throw new Error("Invalid username/email or password.");
  }

  if (!user.emailConfirmed) {
    res.status(401);
    throw new Error("Please confirm your email before logging in.");
  }

  const token = generateToken(user.id);
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
    token,
  };
};

export const generateEmailConfirmationToken = (userId: string) => {
  const secret = process.env.JWT_EMAIL_SECRET;
  const token = jwt.sign({ userId }, secret, { expiresIn: "24h" });

  return token;
};
