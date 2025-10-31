import express from "express";
import { signupUser, signinUser } from "../controllers/authController.js";

const router = express.Router();

// POST /api/auth/signup
router.post("/signup", signupUser);

// POST /api/auth/signin
router.post("/signin", signinUser);

export default router;

