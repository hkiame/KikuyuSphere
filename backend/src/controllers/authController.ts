import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { register, login } from "../services/authService";
import { generateToken } from "../utils/auth";
import { sendEmail } from "../services/emailService";
import { readEmailTemplate } from "../utils/templateUtils";

export const registerUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { username, firstName, lastName, email, password } = req.body;
    try {
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

      // Construct confirmation link
      const confirmationLink = `${process.env.APP_URL}/confirm-email`;

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
    } catch (error) {
      res.status(500).json({ error: "User registration failed." });
    }
  }
);

export const loginUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await login(email, password);

    res.json(user);
  }
);
