import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Request Body:", req.body);

  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({
      errors: error.array().map((err: any) => ({ [err.path]: err.msg })),
    });
  }
  return res.status(201).json({ message: "Register success" });
};

export const verifyOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(200).json({ message: "OTP verified successfully" });
};

export const confirmPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(200).json({ message: "Password confirmed successfully" });
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(200).json({ message: "Login success" });
};
