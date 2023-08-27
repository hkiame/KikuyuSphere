import express from "express";
import { profile } from "../controllers/userController";
import { authorizeUser } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/profile", authorizeUser, profile);

export default router;
