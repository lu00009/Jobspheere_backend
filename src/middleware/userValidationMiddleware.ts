import { body } from "express-validator";

export const registerValidation = () => [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is Required")
    .isLength({ min: 3, max: 50 }),
  body("email").trim().isEmail().withMessage("Invalid Email"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is Required")
    .isLength({
      min: 8,
      max: 20,
    }),
];

export const loginValidation = () => [
  body("email").trim().isEmail().withMessage("Invalid Email"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is Required")
    .isLength({
      min: 8,
      max: 20,
    }),
];