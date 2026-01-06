import { randomBytes } from "crypto";
import { prisma } from "../../lib/prisma";

export const generateOTP = () => {
  return (parseInt(randomBytes(3).toString("hex"), 16) % 900000) + 100000;
};

export const generateToken = () => {
  return randomBytes(32).toString("hex");
};

export const createOtp = async (data: {
  phone: string;
  otp: string;
  token: string;
  count: number;
}) => {
  return await prisma.otp.create({
    data: {
      phone: data.phone,
      otp: data.otp,
      rememberToken: data.token,
      count: data.count,
    },
  });
};
