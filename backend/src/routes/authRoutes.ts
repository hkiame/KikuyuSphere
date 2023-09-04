import express from "express";
import {
  registerUser,
  loginUser,
  confirmEmail,
} from "../controllers/authController";
import { validateRegistration } from "../middleware/validationMiddleware";

const router = express.Router();

router.post("/register", validateRegistration, registerUser);
router.post("/login", loginUser);
router.get("/confirm-email", confirmEmail);

export default router;
