import { checkSchema } from "express-validator";

export const registerValidation = checkSchema({
  email: {
    errorMessage: "Invalid email address",
    isEmail: true,
    notEmpty: true,
  },
  phone: {
    errorMessage: "Invalid phone number",
    trim: true,
    isMobilePhone: {
      options: ["any"],
    },
    notEmpty: { errorMessage: "Phone number is required" },
  },
});
