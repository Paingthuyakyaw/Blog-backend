import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { createOtp, generateOTP, generateToken } from "../util/generate";
import bcrypt from "bcrypt";
import { prisma } from "../../lib/prisma";
import dayjs from "dayjs";

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

    const existsPhone = await prisma.otp.findFirst({
      where: { phone },
    });

    const otp = generateOTP();
    const randomToken = generateToken();

    let result;

    if (!existsPhone) {
      result = await createOtp({
        phone: req.body.phone,
        otp: await bcrypt.hash(otp.toString(), 10),
        token: randomToken,
        count: 1,
      });
    } else {
      if (dayjs(existsPhone.updatedAt).isSame(dayjs(), "day")) {
        if (existsPhone.count >= 4) {
          return res.status(429).json({
            message:
              "You have exceeded the maximum number of OTP requests. Please try again later.",
          });
        } else {
          result = await prisma.otp.update({
            where: { id: existsPhone.id },
            data: {
              otp: await bcrypt.hash(otp.toString(), 10),
              rememberToken: randomToken,
              count: { increment: 1 },
            },
          });
        }
      } else {
        result = await prisma.otp.update({
          where: { id: existsPhone.id },
          data: {
            otp: await bcrypt.hash(otp.toString(), 10),
            rememberToken: randomToken,
            count: 1,
          },
        });
      }
    }

    return res.status(201).json({
      message: "Register success",
      opt: result.otp,
      rememberToken: result.rememberToken,
    });
  } catch (err) {
    return next(err);
  }
};

export const verifyOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { phone, otp, token } = req.body;

  const existsPhone = await prisma.user.findFirst({ where: { phone } });
  if (existsPhone) {
    return res.status(400).json({ message: "Phone number already registered" });
  }

  const otpRecord = await prisma.otp.findFirst({
    where: { phone, rememberToken: token },
  });
  if (!otpRecord) {
    return res.status(400).json({ message: "Invalid phone number" });
  }

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
