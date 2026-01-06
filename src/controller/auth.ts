import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { createOtp, generateOTP, generateToken } from "../util/generate";
import bcrypt from "bcrypt";
import { prisma } from "../../lib/prisma";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({
        errors: error.array().map((err: any) => ({ [err.path]: err.msg })),
      });
    }

    const { phone } = req.body;

    const exitsPhone = await prisma.otp.findFirst({
      where: { phone },
    });

    if (exitsPhone) {
      return res.status(400).json({ message: "Phone number already exists" });
    }

    const otp = generateOTP();
    const randomToken = generateToken();

    const createdOtp = await createOtp({
      phone: req.body.phone,
      otp: await bcrypt.hash(otp.toString(), 10),
      token: randomToken,
      count: 1,
    });

    return res.status(201).json({ message: "Register success" });
  } catch (err) {
    return next(err);
  }
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
