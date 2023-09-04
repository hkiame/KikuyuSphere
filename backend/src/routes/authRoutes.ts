import express from "express";
import {
  registerUser,
  loginUser,
  confirmEmail,
} from "../controllers/authController";
import {
  validateLogin,
  validateRegistration,
} from "../middleware/validationMiddleware";

const router = express.Router();

router.post("/register", validateRegistration, registerUser);
router.post("/login", validateLogin, loginUser);
router.get("/confirm-email", confirmEmail);

export default router;
