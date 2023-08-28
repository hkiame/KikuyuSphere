import express from "express";
import {
  registerUser,
  loginUser,
  confirmEmail,
} from "../controllers/authController";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/confirm-email", confirmEmail);

export default router;
