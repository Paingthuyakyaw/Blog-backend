import express from "express";
import {
  confirmPassword,
  login,
  register,
  verifyOtp,
} from "../controller/auth";
import { registerValidation } from "../validation/auth";

const router = express.Router();

router.post("/register", registerValidation, register);
router.post("/verify-otp", verifyOtp);
router.post("/confirm-password", confirmPassword);
router.post("/login", login);

export default router;
