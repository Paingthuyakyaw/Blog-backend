import { checkSchema } from "express-validator";

export const registerValidation = checkSchema({
  // email: {
  //   errorMessage: "Invalid email address",
  //   isEmail: true,
  //   notEmpty: true,
  // },
  phone: {
    errorMessage: "Invalid phone number",
    trim: true,
    isMobilePhone: {
      options: ["any"],
    },
    notEmpty: { errorMessage: "Phone number is required" },
  },
});

export const verifyOtpValidation = checkSchema({
  phone: {
    errorMessage: "Invalid phone number",
    trim: true,
  },
  otp: {
    errorMessage: "OTP is required",
    isLength: {
      options: { min: 6, max: 6 },
    },
  },
  token: {
    errorMessage: "Token is required",
    notEmpty: true,
  },
});
