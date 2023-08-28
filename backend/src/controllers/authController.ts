import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { register, login } from "../services/authService";
import { generateToken } from "../utils/auth";
import { sendEmail } from "../services/emailService";
import { readEmailTemplate } from "../utils/templateUtils";
import { generateEmailConfirmationToken } from "../services/authService";
import jwt from "jsonwebtoken";
import prisma from "../prisma/client";

export const registerUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { username, firstName, lastName, email, password } = req.body;
    try {
      await prisma.user.deleteMany();
      // Register user
      const newUser = await register(
        firstName,
        lastName,
        username,
        email,
        password
      );

      if (!newUser) {
        res.status(400);
        throw new Error("User registration failed.");
      }

      const {
        id,
        username: registeredUsername,
        firstName: registeredFirstName,
        lastName: registeredLastName,
        email: registeredEmail,
      } = newUser;

      // Generate token
      const token = generateToken(id);

      // Read email template asynchronously
      const emailTemplate = await readEmailTemplate("emailConfirmation");

      // email address confirmation token
      const emailConfirmationToken = generateEmailConfirmationToken(id);

      // Construct confirmation link
      const confirmationLink = `${process.env.APP_URL}/confirm-email?token=${emailConfirmationToken}`;

      // Replace placeholders with actual values
      const emailContent = emailTemplate.replace(
        "{{ confirmationLink }}",
        confirmationLink
      );

      // Send confirmation email
      await sendEmail(registeredEmail, "Confirm Your Email", emailContent);

      // Respond with user data and token
      res.status(201).json({
        id,
        firstName: registeredFirstName,
        lastName: registeredLastName,
        username: registeredUsername,
        email: registeredEmail,
        token,
        message:
          "Registration successful. Please check your email to confirm your email address.",
      });
    } catch (err) {
      res.status(400);
      throw new Error("User registration failed.");
    }
  }
);

export const loginUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await login(email, password);

    res.status(201).json(user);
  }
);

export const confirmEmail = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const token = req.query.token as string;

    try {
      const secret = process.env.JWT_EMAIL_SECRET;

      const decodedToken: any = jwt.verify(token, secret);

      const userId = decodedToken.userId;

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { emailConfirmed: true },
      });

      // Generate token
      const newToken = generateToken(userId);

      res.status(201).json({
        id: userId,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        username: updatedUser.username,
        email: updatedUser.email,
        token: newToken,
        message: "Email confirmed successfully.",
      });
    } catch (err) {
      res.status(401);
      throw new Error(
        "Token verification failed. Please use a valid confirmation link."
      );
    }
  }
);
